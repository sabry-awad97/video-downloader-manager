import { VideoDownloaderManager } from './lib/VideoDownloaderManager.js';

const videoUrls = [
  'https://www.youtube.com/watch?v=qLr9jdB6Hho',
  'https://www.youtube.com/watch?v=7dkh9tNXKR4',
];

const downloaderManager = new VideoDownloaderManager(2);
videoUrls.forEach(videoUrl => downloaderManager.addVideoUrl(videoUrl));
downloaderManager.startDownloads().catch(error => {
  console.error(`Failed to download videos: ${error}`);
});
