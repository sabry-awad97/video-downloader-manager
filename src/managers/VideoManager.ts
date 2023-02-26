import { Video } from '../models/Video';
import { VideoInfoResponse } from '../api/types.js';
import { VideoInfoClient } from '../api/VideoInfoClient.js';
import { Resolution } from './types';
import LRUCache from 'lru-cache';

type AdaptiveFormat = VideoInfoResponse['streamingData']['adaptiveFormats'][0];

export class VideoManager {
  private readonly videoUrl: string;
  private readonly cache: LRUCache<string, VideoInfoResponse>;

  constructor(
    videoUrl: string,
    private readonly videoInfoClient: VideoInfoClient
  ) {
    this.videoUrl = videoUrl;
    this.cache = new LRUCache<string, VideoInfoResponse>({
      max: 100, // maximum number of items to cache
      maxAge: 1000 * 60 * 5, // maximum age of items in milliseconds (5 minutes)
    });
  }

  async getVideo(resolution: Resolution): Promise<Video> {
    let videoInfo: VideoInfoResponse | undefined = this.cache.get(
      this.videoUrl
    );

    if (!videoInfo) {
      videoInfo = await this.videoInfoClient.getVideoInfo(this.videoUrl);
      this.cache.set(this.videoUrl, videoInfo);
    }

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
      resolution: Resolution;
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
