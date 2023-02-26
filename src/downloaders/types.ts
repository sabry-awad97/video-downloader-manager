export interface StreamState {
  fileSize: number;
  downloaded: number;
  buffer: Uint8Array;
}

export interface DownloadProgress {
  downloaded: number;
  totalSize: number;
}
