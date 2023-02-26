import { DownloaderManager } from './managers/DownloaderManager.js';

const videoUrls = ['https://www.youtube.com/watch?v=wDchsz8nmbo'];

const downloaderManager = new DownloaderManager(2);

for (const videoUrl of videoUrls) {
  downloaderManager.addVideoUrl(videoUrl);
}

downloaderManager.startDownloads().catch(error => {
  console.error(`Failed to download videos: ${error}`);
});
