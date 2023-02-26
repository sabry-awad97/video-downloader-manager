import { VideoInfoResponse } from '../api/types.js';
import { Video } from '../models/Video.js';
import { VideoInfoClient } from '../api/VideoInfoClient.js';

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
    const durationSeconds =
      info.streamingData.adaptiveFormats[0].approxDurationMs;
    const title = info.videoDetails.title;
    const videoId = info.videoDetails.videoId;

    const video: Video = {
      streamUrl,
      videoSize: parseInt(fileSize, 10),
      durationSeconds: parseInt(durationSeconds, 10),
      title,
      videoId,
    };

    return video;
  }
}
