export class Video {
  private constructor(
    public streamUrl: string,
    public videoSize: number,
    public durationSeconds: number,
    public title: string,
    public description: string,
    public videoId: string,
    public translatedTitle?: string,
    public translatedDescription?: string
  ) {}
}
