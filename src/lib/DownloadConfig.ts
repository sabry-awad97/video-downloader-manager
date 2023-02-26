import { Video } from '../types/interfaces.js';

const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_RANGE_SIZE = 1 * 1024 * 1024; // 1MB

export class DownloadConfig {
  public streamUrl: string | null = null;
  public maxRetries: number = DEFAULT_MAX_RETRIES;
  public rangeSize: number = DEFAULT_RANGE_SIZE;
  public videoSize: number = 0;

  constructor() {}

  build(video: Video): DownloadConfig {
    this.streamUrl = video.streamUrl;
    this.videoSize = video.fileSize;
    return this;
  }
}
