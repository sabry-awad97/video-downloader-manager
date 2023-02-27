import fs from 'fs';
import pLimit from 'p-limit';
import path from 'path';

import { DownloadConfig } from '../models/DownloadConfig.js';
import { MultiBarManager } from './MultiBarManager.js';
import { VideoDownloader } from '../downloaders/VideoDownloader.js';
import { VideoManager } from './VideoManager.js';
import { VideoInfoClient } from '../api/VideoInfoClient.js';
import { Resolution } from './types.js';
import { performance } from 'perf_hooks';
import axios from 'axios';

export class DownloaderManager {
  maxParallelDownloads: number;
  videoUrls: string[];
  downloadQueue: Promise<any>[];
  multiBar = new MultiBarManager();
  constructor(maxParallelDownloads = 2) {
    this.maxParallelDownloads = maxParallelDownloads;
    this.videoUrls = [];
    this.downloadQueue = [];
  }

  addVideoUrl(videoUrl: string) {
    this.videoUrls.push(videoUrl);
  }

  async startDownloads(resolution: Resolution) {
    console.log(`Starting downloads for ${this.videoUrls.length} videos`);

    let optimalConcurrentDownloads =
      await this.calculateOptimalConcurrentDownloads(resolution);

    console.log('Optimal concurrent downloads: ' + optimalConcurrentDownloads);

    if (optimalConcurrentDownloads > 10) {
      optimalConcurrentDownloads = this.maxParallelDownloads;
    }

    const limit = pLimit(this.maxParallelDownloads);
    const downloadPromises = this.videoUrls.map(url =>
      limit(() => this.downloadVideo(url, resolution))
    );

    await Promise.all(downloadPromises);

    this.multiBar.stop();
    console.log('All videos downloaded successfully');
  }

  async downloadVideo(videoUrl: string, resolution: Resolution) {
    const videoInfoClient = new VideoInfoClient();
    const videoManager = new VideoManager(videoUrl, videoInfoClient);
    const video = await videoManager.getVideo(resolution);
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

  private async calculateOptimalConcurrentDownloads(
    resolution: Resolution
  ): Promise<number> {
    // Get the total size of all videos
    const sizes = await Promise.all(
      this.videoUrls.map(async url => {
        const videoInfoClient = new VideoInfoClient();
        const videoManager = new VideoManager(url, videoInfoClient);
        const video = await videoManager.getVideo(resolution);
        const downloadConfig = new DownloadConfig().build(video);
        return downloadConfig.videoSize;
      })
    );

    const totalSize =
      sizes.reduce((totalSize, size) => totalSize + size, 0) / (1024 * 1024); // total size in megabits

    // Calculate the internet speed
    const internetSpeed = await this.calculateInternetSpeed();

    // Calculate the optimal number of concurrent downloads
    const optimalConcurrentDownloads = Math.floor(totalSize / internetSpeed);

    // Ensure the optimal number of concurrent downloads is at least 1
    return Math.max(optimalConcurrentDownloads, 1);
  }

  async calculateInternetSpeed(): Promise<number> {
    const url = 'http://speedtest.tele2.net/1MB.zip'; // URL of a small file for testing download speed

    const startTime = performance.now(); // Start time of the download

    const response = await axios({
      method: 'get',
      url,
      responseType: 'blob',
    });

    const endTime = performance.now(); // End time of the download
    const duration = endTime - startTime; // Duration of the download in milliseconds
    const fileSize = parseInt(response.headers['content-length']!); // Size of the file in bytes
    const speedInBitsPerSecond = (fileSize * 8) / (duration / 1000); // Internet speed in bits per second
    const speedInMbps = speedInBitsPerSecond / (1024 * 1024); // Internet speed in megabits per second
    console.log(`Internet speed: ${speedInMbps.toFixed(2)} Mbps`);
    return speedInMbps;
  }
}
