import cliProgress from 'cli-progress';
import { bytesToHumanReadable } from './helpers.js';
import { Video } from './Video.js';
import { VideoDownloader } from './VideoDownloader.js';
import { DownloadConfig } from './DownloadConfig.js';
import { VideoInfoClient } from './VideoInfoClient.js';
import pLimit from 'p-limit';

export class VideoDownloaderManager {
  maxParallelDownloads: number;
  videoUrls: string[];
  downloadQueue: Promise<any>[];
  bars: { [key: string]: cliProgress.SingleBar };
  constructor(maxParallelDownloads = 2) {
    this.maxParallelDownloads = maxParallelDownloads;
    this.videoUrls = [];
    this.downloadQueue = [];
    this.bars = {};
  }

  addVideoUrl(videoUrl: string) {
    this.videoUrls.push(videoUrl);
  }

  async startDownloads() {
    console.log(`Starting downloads for ${this.videoUrls.length} videos`);

    const multiBar = new cliProgress.MultiBar({
      format: 'Downloading {name} |{bar}| {percentage}% | {value}/{total}',
      clearOnComplete: true,
      hideCursor: true,
    });

    this.videoUrls.forEach(url => {
      const bar = multiBar.create(1, 0, { name: url });
      this.bars[url] = bar;
    });

    const limit = pLimit(this.maxParallelDownloads);
    const downloadPromises = this.videoUrls.map(url =>
      limit(() => this.downloadVideo(url))
    );

    await Promise.all(downloadPromises);

    multiBar.stop();
    console.log('All videos downloaded successfully');
  }

  async downloadVideo(videoUrl: string) {
    const videoInfoClient = new VideoInfoClient();
    const videoInfo = await videoInfoClient.getVideoInfo(videoUrl);
    const video = Video.fromVideoInfo(videoInfo);
    const downloadConfig = new DownloadConfig().build(video);
    const downloader = new VideoDownloader(downloadConfig);
    const bar = this.bars[videoUrl];
    bar.setTotal(downloadConfig.fileSize);
    return new Promise<void>((resolve, reject) => {
      downloader
        .downloadVideo(({ downloaded, totalSize }) => {
          const percent = (downloaded / totalSize) * 100;
          bar.update(downloaded, {
            percentage: percent.toFixed(2),
            value: bytesToHumanReadable(downloaded),
          });
        })
        .then(() => {
          bar.update(downloadConfig.fileSize, {
            percentage: 100,
            value: bytesToHumanReadable(downloadConfig.fileSize),
          });
          console.log(`Download of video ${videoUrl} completed successfully`);
          resolve();
        })
        .catch(error => {
          console.error(`Download of video ${videoUrl} failed: ${error}`);
          reject(error);
        });
    });
  }
}
