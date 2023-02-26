import { Video } from '../models/Video';
import { VideoInfoResponse } from '../api/types.js';
import { VideoInfoClient } from '../api/VideoInfoClient.js';
import { Resolution } from './types';

type AdaptiveFormat = VideoInfoResponse['streamingData']['adaptiveFormats'][0];

export class VideoManager {
  private readonly videoUrl: string;

  constructor(
    videoUrl: string,
    private readonly videoInfoClient: VideoInfoClient
  ) {
    this.videoUrl = videoUrl;
  }

  async getVideo(resolution: Resolution): Promise<Video> {
    const videoInfo: VideoInfoResponse =
      await this.videoInfoClient.getVideoInfo(this.videoUrl);

    const format: AdaptiveFormat = VideoManager.chooseFormat({
      formats: videoInfo.streamingData.adaptiveFormats,
      criteria: { resolution },
    });

    const videoData: Video = VideoManager.createVideoData(videoInfo, format);
    return videoData;
  }

  static createVideoData(
    info: VideoInfoResponse,
    format: AdaptiveFormat
  ): Video {
    return {
      streamUrl: format.url,
      videoSize: parseInt(format.contentLength),
      durationSeconds: parseInt(info.videoDetails.lengthSeconds),
      title: info.videoDetails.title,
      videoId: info.videoDetails.videoId,
    };
  }

  static chooseFormat({
    formats,
    criteria,
  }: {
    formats: AdaptiveFormat[];
    criteria: {
      resolution: '1080p' | '720p' | '480p' | '360p' | '240p' | '144p';
    };
  }): AdaptiveFormat {
    let found: AdaptiveFormat | null = formats[0];
    for (const format of formats) {
      if (criteria?.resolution == format['qualityLabel']) {
        found = format;
        break;
      }
    }
    return found;
  }
}
