import { VideoInfoResponse } from '../api/types.js';
import { Video } from '../types/interfaces.js';
import { VideoInfoClient } from './VideoInfoClient.js';

export class VideoManager {
  private readonly videoUrl: string;
  private readonly videoInfoClient: VideoInfoClient;

  constructor(videoUrl: string) {
    this.videoUrl = videoUrl;
    this.videoInfoClient = new VideoInfoClient();
  }

  async getVideo(): Promise<Video> {
    const videoInfo = await this.videoInfoClient.getVideoInfo(this.videoUrl);
    return VideoManager.fromVideoInfo(videoInfo);
  }

  static fromVideoInfo(info: VideoInfoResponse): Video {
    const streamUrl = info.streamingData.adaptiveFormats[0].url;
    const fileSize = info.streamingData.adaptiveFormats[0].contentLength;
    const title = info.videoDetails.title;
    const videoId = info.videoDetails.videoId;
    const video: Video = {
      streamUrl,
      fileSize: parseInt(fileSize, 10),
      title,
      videoId,
    };

    return video;
  }
}
