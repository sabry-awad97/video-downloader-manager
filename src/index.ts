import { DownloaderManager } from './lib/DownloaderManager.js';

const videoUrls = ['https://www.youtube.com/watch?v=wDchsz8nmbo'];

const downloaderManager = new DownloaderManager(2);
videoUrls.forEach(videoUrl => downloaderManager.addVideoUrl(videoUrl));
downloaderManager.startDownloads().catch(error => {
  console.error(`Failed to download videos: ${error}`);
});
