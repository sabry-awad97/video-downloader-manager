import cliProgress from 'cli-progress';
import { bytesToHumanReadable } from './lib/helpers.js';
import { Video } from './lib/Video.js';
import { VideoDownloader } from './lib/VideoDownloader.js';
import { DownloadConfig } from './lib/DownloadConfig.js';
import { VideoInfoClient } from './lib/VideoInfoClient.js';

class VideoDownloaderManager {
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

    while (this.videoUrls.length > 0 || this.downloadQueue.length > 0) {
      while (
        this.downloadQueue.length < this.maxParallelDownloads &&
        this.videoUrls.length > 0
      ) {
        const videoUrl = this.videoUrls.shift()!;
        const downloadPromise = this.downloadVideo(videoUrl);
        this.downloadQueue.push(downloadPromise);
      }

      const completedPromise = await Promise.race(this.downloadQueue);
      this.downloadQueue = this.downloadQueue.filter(
        p => p !== completedPromise
      );
    }

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

const videoUrls = [
  'https://www.youtube.com/watch?v=qLr9jdB6Hho&list=PLMPqxr1nu2Zev1kdVu7VqZpJuXVT65Z-f&index=7',
  'https://www.youtube.com/watch?v=jNQXAC9IVRw',
];

const downloaderManager = new VideoDownloaderManager(2);
videoUrls.forEach(videoUrl => downloaderManager.addVideoUrl(videoUrl));
downloaderManager.startDownloads().catch(error => {
  console.error(`Failed to download videos: ${error}`);
});
