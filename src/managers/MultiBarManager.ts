import cliProgress from 'cli-progress';
import { bytesToHumanReadable } from '../helpers/bytesToHumanReadable.js';

export class MultiBarManager {
  bars = new cliProgress.MultiBar({
    format: 'Downloading {name} |{bar}| {percentage}% | {value}/{total}',
    clearOnComplete: true,
    hideCursor: true,
  });

  public create(videoUrl: string, total: number) {
    const bar = this.bars.create(1, 0, { name: videoUrl });
    bar.setTotal(total);
    return bar;
  }

  public update(
    bar: cliProgress.SingleBar,
    downloaded: number,
    totalSize: number
  ) {
    const percent = (downloaded / totalSize) * 100;
    bar.update(downloaded, {
      percentage: percent.toFixed(2),
      value: bytesToHumanReadable(downloaded),
    });
  }

  public stop() {
    this.bars.stop();
  }
}
