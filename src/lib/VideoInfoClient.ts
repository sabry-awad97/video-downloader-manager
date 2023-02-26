import axios, { AxiosRequestConfig } from 'axios';
import dotenv from 'dotenv';
import { VideoInfoRequest, VideoInfoResponse } from '../api/types';
export class VideoInfoClient {
  private api_key: string;
  private headers: AxiosRequestConfig['headers'];

  constructor() {
    dotenv.config();
    this.api_key = process.env.YOUTUBE_API_KEY!;
    this.headers = VideoInfoClient.createHeaders();
  }

  public async getVideoInfo(videoUrl: string): Promise<VideoInfoResponse> {
    const url = `https://www.youtube.com/youtubei/v1/player?key=${this.api_key}`;
    const videoId = this.extractVideoId(videoUrl);
    const requestBody = this.getRequestBody(videoId);

    const response = await axios.post<VideoInfoResponse>(url, requestBody, {
      headers: this.headers,
    });

    return response.data;
  }

  private extractVideoId(videoUrl: string): string {
    const regex = /(youtu\.be\/|v=)([^&]+)/;
    const matches = videoUrl.match(regex);
    if (matches && matches.length > 2) {
      return matches[2];
    }
    throw new Error('Invalid YouTube video URL');
  }

  private getRequestBody(videoId: string): VideoInfoRequest {
    const requestBody: VideoInfoRequest = {
      context: {
        client: {
          hl: 'en',
          clientName: 'WEB',
          clientVersion: '2.20210721.00.00',
          clientFormFactor: 'UNKNOWN_FORM_FACTOR',
          clientScreen: 'WATCH',
          mainAppWebInfo: {
            graftUrl: `/watch?v=${videoId}`,
          },
        },
        user: {
          lockedSafetyMode: false,
        },
        request: {
          useSsl: true,
          internalExperimentFlags: [],
          consistencyTokenJars: [],
        },
      },
      videoId,
      playbackContext: {
        contentPlaybackContext: {
          vis: 0,
          splay: false,
          autoCaptionsDefaultOn: false,
          autonavState: 'STATE_NONE',
          html5Preference: 'HTML5_PREF_WANTS',
          lactMilliseconds: '-1',
        },
      },
      racyCheckOk: false,
      contentCheckOk: false,
    };

    return requestBody;
  }

  private static createHeaders(): AxiosRequestConfig['headers'] {
    return {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    };
  }
}
