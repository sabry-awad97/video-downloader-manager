import fs from 'fs';
import pLimit from 'p-limit';
import path from 'path';

import { DownloadConfig } from './DownloadConfig.js';
import { MultiBar } from './MultiBar';
import { VideoDownloader } from './VideoDownloader.js';
import { VideoManager } from './VideoManager.js';

export class DownloaderManager {
  maxParallelDownloads: number;
  videoUrls: string[];
  downloadQueue: Promise<any>[];
  multiBar = new MultiBar();
  constructor(maxParallelDownloads = 2) {
    this.maxParallelDownloads = maxParallelDownloads;
    this.videoUrls = [];
    this.downloadQueue = [];
  }

  addVideoUrl(videoUrl: string) {
    this.videoUrls.push(videoUrl);
  }

  async startDownloads() {
    console.log(`Starting downloads for ${this.videoUrls.length} videos`);

    const limit = pLimit(this.maxParallelDownloads);
    const downloadPromises = this.videoUrls.map(url =>
      limit(() => this.downloadVideo(url))
    );

    await Promise.all(downloadPromises);

    this.multiBar.stop();
    console.log('All videos downloaded successfully');
  }

  async downloadVideo(videoUrl: string) {
    const videoManager = new VideoManager(videoUrl);
    const video = await videoManager.getVideo();
    const downloadConfig = new DownloadConfig().build(video);
    const downloader = new VideoDownloader(downloadConfig);
    const bar = this.multiBar.create(videoUrl, downloadConfig.videoSize);

    const videoTitle = `${video.title.replace(/\//g, '_')}.mp4`;
    const videoPath = path.join(process.cwd(), videoTitle);
    const writeStream = fs.createWriteStream(videoPath);
    return new Promise<void>((resolve, reject) => {
      downloader
        .downloadVideo({
          onProgress: ({ downloaded, totalSize }) => {
            this.multiBar.update(bar, downloaded, totalSize);
          },
          onChunk: (chunk: Uint8Array) => {
            writeStream.write(chunk);
          },
        })
        .then(() => {
          writeStream.end();
          this.multiBar.update(
            bar,
            downloadConfig.videoSize,
            downloadConfig.videoSize
          );
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
