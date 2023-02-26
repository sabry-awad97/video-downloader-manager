import axios, { AxiosError } from 'axios';
import { DownloadConfig } from '../models/DownloadConfig.js';
import { concatenateBuffers } from '../helpers/concatenateBuffers.js';

class StreamError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

interface StreamState {
  fileSize: number;
  downloaded: number;
  buffer: Uint8Array;
}

interface DownloadProgress {
  downloaded: number;
  totalSize: number;
}

export class VideoDownloader {
  constructor(public config: DownloadConfig) {}

  async downloadVideo({
    onProgress,
    onComplete,
    onChunk,
  }: {
    onProgress?: (progress: DownloadProgress) => void;
    onComplete?: (data: Uint8Array) => void;
    onChunk?: (chunk: Uint8Array) => void;
  } = {}): Promise<Uint8Array> {
    const client = axios.create();

    let state: StreamState = {
      fileSize: this.config.videoSize,
      downloaded: 0,
      buffer: new Uint8Array(),
    };

    let lastProgressPrinted = Date.now();

    while (state.downloaded < state.fileSize && this.config.streamUrl) {
      const stopPos =
        Math.min(state.downloaded + this.config.rangeSize, state.fileSize) - 1;

      const rangeHeader = `bytes=${state.downloaded}-${stopPos}`;

      let tries = 0;
      while (tries <= this.config.maxRetries) {
        try {
          const response = await client.get(this.config.streamUrl, {
            headers: {
              Range: rangeHeader,
              'User-Agent': 'Mozilla/5.0',
              'Accept-Language': 'en-US,en',
            },
            responseType: 'arraybuffer',
          });

          switch (response.status) {
            case 200:
            case 206:
              const content = new Uint8Array(response.data);
              onChunk?.(content);
              state.buffer = concatenateBuffers(state.buffer, content);
              state.downloaded += content.length;

              if (Date.now() - lastProgressPrinted >= 1000) {
                lastProgressPrinted = Date.now();
                onProgress?.({
                  downloaded: state.downloaded,
                  totalSize: state.fileSize,
                });
              }
              break;

            case 416:
              if (response.headers['content-range']) {
                const contentRange = response.headers['content-range'];
                const contentLengthStr = contentRange.split('/')[1].trim();
                const contentLength = parseInt(contentLengthStr);
                if (!isNaN(contentLength)) {
                  state.fileSize = contentLength;
                } else {
                  throw new StreamError(
                    `Invalid content length: ${contentLengthStr}`
                  );
                }
              } else {
                throw new StreamError('Range not satisfiable');
              }
              break;

            default:
              throw new StreamError(`HTTP error: ${response.status}`);
          }
          break;
        } catch (error: any) {
          if (error instanceof StreamError) {
            throw error;
          } else if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
              throw new StreamError(
                `HTTP error: ${axiosError.response.status}`
              );
            } else if (axiosError.code === 'ECONNABORTED') {
              console.warn(
                `Request timed out, retrying... (${tries}/${this.config.maxRetries})`
              );
              tries++;
            } else {
              throw new StreamError(`Request failed: ${axiosError.message}`);
            }
          } else {
            throw new StreamError(`Request failed: ${error.message}`);
          }
        }

        if (tries > this.config.maxRetries) {
          throw new StreamError('Max retries exceeded');
        }
      }
    }

    onComplete?.(state.buffer);
    return state.buffer;
  }
}
