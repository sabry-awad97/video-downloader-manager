export const bytesToHumanReadable = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
};

export const concatenateBuffers = (...buffers: Uint8Array[]): Uint8Array => {
  // Calculate the total length of all the buffers
  const totalLength = buffers.reduce((sum, buffer) => sum + buffer.length, 0);

  // Allocate a new buffer to hold the concatenated data
  const result = new Uint8Array(totalLength);

  // Copy the data from each buffer into the result buffer
  let offset = 0;
  for (const buffer of buffers) {
    result.set(buffer, offset);
    offset += buffer.length;
  }

  return result;
};
