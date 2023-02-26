import { VideoDownloaderManager } from './lib/VideoDownloaderManager.js';

const videoUrls = ['https://www.youtube.com/watch?v=wDchsz8nmbo'];

const downloaderManager = new VideoDownloaderManager(2);
videoUrls.forEach(videoUrl => downloaderManager.addVideoUrl(videoUrl));
downloaderManager.startDownloads().catch(error => {
  console.error(`Failed to download videos: ${error}`);
});
