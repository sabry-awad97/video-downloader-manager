import { Video } from './Video.js';
const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_RANGE_SIZE = 10 * 1024; // 100KB

export class DownloadConfig {
  public streamUrl: string | null = null;
  public maxRetries: number = DEFAULT_MAX_RETRIES;
  public rangeSize: number = DEFAULT_RANGE_SIZE;
  public fileSize: number = 0;

  constructor() {}

  build(video: Video): DownloadConfig {
    this.streamUrl = video.streamUrl;
    this.fileSize = video.fileSize;
    return this;
  }
}
