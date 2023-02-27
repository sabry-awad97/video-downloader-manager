import { Video } from '../models/Video';
import { VideoInfoResponse } from '../api/types.js';
import { VideoInfoClient } from '../api/VideoInfoClient.js';
import { Resolution } from './types';
import LRUCache from 'lru-cache';
import { LocalizationLibrary } from '../i18/Localization';

type AdaptiveFormat = VideoInfoResponse['streamingData']['adaptiveFormats'][0];

export class VideoManager {
  private readonly videoUrl: string;
  private readonly cache: LRUCache<string, VideoInfoResponse>;

  constructor(
    videoUrl: string,
    private readonly videoInfoClient: VideoInfoClient,
    private tanslatedLanguage?: string,
    private readonly localizationLibrary?: LocalizationLibrary
  ) {
    this.videoUrl = videoUrl;
    this.localizationLibrary = localizationLibrary;
    this.cache = new LRUCache<string, VideoInfoResponse>({
      max: 100, // maximum number of items to cache
      ttl: 1000 * 60 * 5, // maximum age of items in milliseconds (5 minutes)
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

    const videoData: Video = VideoManager.createVideoData(
      videoInfo,
      format,
      this.localizationLibrary,
      this.tanslatedLanguage
    );
    return videoData;
  }

  private static createVideoData(
    info: VideoInfoResponse,
    format: AdaptiveFormat,
    localizationLibrary?: LocalizationLibrary,
    language?: string
  ): Video {
    const translatedTitle = localizationLibrary?.translate(
      info.videoDetails.title,
      language
    );
    const translatedDescription = localizationLibrary?.translate(
      info.videoDetails.shortDescription,
      language
    );

    return {
      streamUrl: format.url,
      videoSize: parseInt(format.contentLength),
      durationSeconds: parseInt(info.videoDetails.lengthSeconds),
      title: info.videoDetails.title,
      description: info.videoDetails.shortDescription,
      videoId: info.videoDetails.videoId,
      translatedTitle,
      translatedDescription,
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
