import { VideoInfoResponse } from '../api/types.js';

export class Video {
  private constructor(
    public streamUrl: string,
    public fileSize: number,
    public title: string
  ) {}
  static fromVideoInfo(info: VideoInfoResponse): Video {
    const streamUrl = info.streamingData.adaptiveFormats[0].url;
    const fileSize = info.streamingData.adaptiveFormats[0].contentLength;
    const title = info.videoDetails.title;
    return new Video(streamUrl, parseInt(fileSize, 10), title);
  }
}
