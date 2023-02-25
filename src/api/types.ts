export interface VideoInfoRequest {
  context: {
    client: {
      hl: string;
      clientName: string;
      clientVersion: string;
      clientFormFactor: string;
      clientScreen: string;
      mainAppWebInfo: {
        graftUrl: string;
      };
    };
    user: {
      lockedSafetyMode: boolean;
    };
    request: {
      useSsl: boolean;
      internalExperimentFlags: any[];
      consistencyTokenJars: any[];
    };
  };
  videoId: string;
  playbackContext: {
    contentPlaybackContext: {
      vis: number;
      splay: boolean;
      autoCaptionsDefaultOn: boolean;
      autonavState: string;
      html5Preference: string;
      lactMilliseconds: string;
    };
  };
  racyCheckOk: boolean;
  contentCheckOk: boolean;
}

export interface VideoInfoResponse {
  annotations: Annotation[];
  attestation: Attestation;
  cards: Cards;
  frameworkUpdates: FrameworkUpdates;
  messages: Message2[];
  microformat: Microformat;
  playabilityStatus: PlayabilityStatus;
  playbackTracking: PlaybackTracking;
  playerConfig: PlayerConfig;
  responseContext: ResponseContext;
  storyboards: Storyboards;
  streamingData: StreamingData;
  trackingParams: string;
  videoDetails: VideoDetails;
}

interface Annotation {
  playerAnnotationsExpandedRenderer: PlayerAnnotationsExpandedRenderer;
}

interface PlayerAnnotationsExpandedRenderer {
  allowSwipeDismiss: boolean;
  annotationId: string;
  featuredChannel: FeaturedChannel;
}

interface FeaturedChannel {
  channelName: string;
  endTimeMs: string;
  navigationEndpoint: NavigationEndpoint;
  startTimeMs: string;
  subscribeButton: SubscribeButton;
  trackingParams: string;
  watermark: Watermark;
}

interface NavigationEndpoint {
  browseEndpoint: BrowseEndpoint;
  clickTrackingParams: string;
  commandMetadata: CommandMetadata;
}

interface BrowseEndpoint {
  browseId: string;
}

interface CommandMetadata {
  webCommandMetadata: WebCommandMetadata;
}

interface WebCommandMetadata {
  apiUrl: string;
  rootVe: number;
  url: string;
  webPageType: string;
}

interface SubscribeButton {
  subscribeButtonRenderer: SubscribeButtonRenderer;
}

interface SubscribeButtonRenderer {
  buttonText: ButtonText;
  channelId: string;
  enabled: boolean;
  serviceEndpoints: ServiceEndpoint[];
  showPreferences: boolean;
  signInEndpoint: SignInEndpoint;
  subscribeAccessibility: SubscribeAccessibility;
  subscribed: boolean;
  subscribedButtonText: SubscribedButtonText;
  trackingParams: string;
  type: string;
  unsubscribeAccessibility: UnsubscribeAccessibility;
  unsubscribeButtonText: UnsubscribeButtonText;
  unsubscribedButtonText: UnsubscribedButtonText;
}

interface ButtonText {
  runs: Run[];
}

interface Run {
  text: string;
}

interface ServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata2;
  subscribeEndpoint?: SubscribeEndpoint;
  signalServiceEndpoint?: SignalServiceEndpoint;
}

interface CommandMetadata2 {
  webCommandMetadata: WebCommandMetadata2;
}

interface WebCommandMetadata2 {
  apiUrl?: string;
  sendPost: boolean;
}

interface SubscribeEndpoint {
  channelIds: string[];
  params: string;
}

interface SignalServiceEndpoint {
  actions: Action[];
  signal: string;
}

interface Action {
  clickTrackingParams: string;
  openPopupAction: OpenPopupAction;
}

interface OpenPopupAction {
  popup: Popup;
  popupType: string;
}

interface Popup {
  confirmDialogRenderer: ConfirmDialogRenderer;
}

interface ConfirmDialogRenderer {
  cancelButton: CancelButton;
  confirmButton: ConfirmButton;
  dialogMessages: DialogMessage[];
  primaryIsCancel: boolean;
  trackingParams: string;
}

interface CancelButton {
  buttonRenderer: ButtonRenderer;
}

interface ButtonRenderer {
  accessibility: Accessibility;
  isDisabled: boolean;
  size: string;
  style: string;
  text: Text;
  trackingParams: string;
}

interface Accessibility {
  label: string;
}

interface Text {
  runs: Run2[];
}

interface Run2 {
  text: string;
}

interface ConfirmButton {
  buttonRenderer: ButtonRenderer2;
}

interface ButtonRenderer2 {
  accessibility: Accessibility2;
  isDisabled: boolean;
  serviceEndpoint: ServiceEndpoint2;
  size: string;
  style: string;
  text: Text2;
  trackingParams: string;
}

interface Accessibility2 {
  label: string;
}

interface ServiceEndpoint2 {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata3;
  unsubscribeEndpoint: UnsubscribeEndpoint;
}

interface CommandMetadata3 {
  webCommandMetadata: WebCommandMetadata3;
}

interface WebCommandMetadata3 {
  apiUrl: string;
  sendPost: boolean;
}

interface UnsubscribeEndpoint {
  channelIds: string[];
  params: string;
}

interface Text2 {
  runs: Run3[];
}

interface Run3 {
  text: string;
}

interface DialogMessage {
  runs: Run4[];
}

interface Run4 {
  text: string;
}

interface SignInEndpoint {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata4;
}

interface CommandMetadata4 {
  webCommandMetadata: WebCommandMetadata4;
}

interface WebCommandMetadata4 {
  url: string;
}

interface SubscribeAccessibility {
  accessibilityData: AccessibilityData;
}

interface AccessibilityData {
  label: string;
}

interface SubscribedButtonText {
  runs: Run5[];
}

interface Run5 {
  text: string;
}

interface UnsubscribeAccessibility {
  accessibilityData: AccessibilityData2;
}

interface AccessibilityData2 {
  label: string;
}

interface UnsubscribeButtonText {
  runs: Run6[];
}

interface Run6 {
  text: string;
}

interface UnsubscribedButtonText {
  runs: Run7[];
}

interface Run7 {
  text: string;
}

interface Watermark {
  thumbnails: Thumbnail[];
}

interface Thumbnail {
  height: number;
  url: string;
  width: number;
}

interface Attestation {
  playerAttestationRenderer: PlayerAttestationRenderer;
}

interface PlayerAttestationRenderer {
  botguardData: BotguardData;
  challenge: string;
}

interface BotguardData {
  interpreterSafeUrl: InterpreterSafeUrl;
  program: string;
  serverEnvironment: number;
}

interface InterpreterSafeUrl {
  privateDoNotAccessOrElseTrustedResourceUrlWrappedValue: string;
}

interface Cards {
  cardCollectionRenderer: CardCollectionRenderer;
}

interface CardCollectionRenderer {
  allowTeaserDismiss: boolean;
  cards: Card[];
  closeButton: CloseButton;
  headerText: HeaderText;
  icon: Icon2;
  logIconVisibilityUpdates: boolean;
  trackingParams: string;
}

interface Card {
  cardRenderer: CardRenderer;
}

interface CardRenderer {
  cardId: string;
  content: Content;
  cueRanges: CueRange[];
  feature: string;
  icon: Icon;
  teaser: Teaser;
  trackingParams: string;
}

interface Content {
  simpleCardContentRenderer: SimpleCardContentRenderer;
}

interface SimpleCardContentRenderer {
  actionButton: ActionButton;
  callToAction: CallToAction;
  command: Command;
  displayDomain: DisplayDomain;
  image: Image;
  showLinkIcon: boolean;
  title: Title;
  trackingParams: string;
}

interface ActionButton {
  simpleCardButtonRenderer: SimpleCardButtonRenderer;
}

interface SimpleCardButtonRenderer {
  action: Action2;
  text: Text3;
  trackingParams: string;
}

interface Action2 {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata5;
  urlEndpoint: UrlEndpoint;
}

interface CommandMetadata5 {
  webCommandMetadata: WebCommandMetadata5;
}

interface WebCommandMetadata5 {
  rootVe: number;
  url: string;
  webPageType: string;
}

interface UrlEndpoint {
  target: string;
  url: string;
}

interface Text3 {
  simpleText: string;
}

interface CallToAction {
  simpleText: string;
}

interface Command {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata6;
  urlEndpoint: UrlEndpoint2;
}

interface CommandMetadata6 {
  webCommandMetadata: WebCommandMetadata6;
}

interface WebCommandMetadata6 {
  rootVe: number;
  url: string;
  webPageType: string;
}

interface UrlEndpoint2 {
  target: string;
  url: string;
}

interface DisplayDomain {
  simpleText: string;
}

interface Image {
  thumbnails: Thumbnail2[];
}

interface Thumbnail2 {
  height: number;
  url: string;
  width: number;
}

interface Title {
  simpleText: string;
}

interface CueRange {
  endCardActiveMs: string;
  iconAfterTeaserMs: string;
  startCardActiveMs: string;
  teaserDurationMs: string;
}

interface Icon {
  infoCardIconRenderer: InfoCardIconRenderer;
}

interface InfoCardIconRenderer {
  trackingParams: string;
}

interface Teaser {
  simpleCardTeaserRenderer: SimpleCardTeaserRenderer;
}

interface SimpleCardTeaserRenderer {
  logVisibilityUpdates: boolean;
  message: Message;
  prominent: boolean;
  trackingParams: string;
}

interface Message {
  simpleText: string;
}

interface CloseButton {
  infoCardIconRenderer: InfoCardIconRenderer2;
}

interface InfoCardIconRenderer2 {
  trackingParams: string;
}

interface HeaderText {
  simpleText: string;
}

interface Icon2 {
  infoCardIconRenderer: InfoCardIconRenderer3;
}

interface InfoCardIconRenderer3 {
  trackingParams: string;
}

interface FrameworkUpdates {
  entityBatchUpdate: EntityBatchUpdate;
}

interface EntityBatchUpdate {
  mutations: Mutation[];
  timestamp: Timestamp;
}

interface Mutation {
  entityKey: string;
  payload: Payload;
  type: string;
}

interface Payload {
  offlineabilityEntity: OfflineabilityEntity;
}

interface OfflineabilityEntity {
  addToOfflineButtonState: string;
  key: string;
}

interface Timestamp {
  nanos: number;
  seconds: string;
}

interface Message2 {
  mealbarPromoRenderer?: MealbarPromoRenderer;
  tooltipRenderer?: TooltipRenderer;
}

interface MealbarPromoRenderer {
  actionButton: ActionButton2;
  dismissButton: DismissButton;
  enableSharedFeatureForImpressionHandling: boolean;
  impressionEndpoints: ImpressionEndpoint[];
  isVisible: boolean;
  messageTexts: MessageText[];
  messageTitle: MessageTitle;
  style: string;
  trackingParams: string;
  triggerCondition: string;
}

interface ActionButton2 {
  buttonRenderer: ButtonRenderer3;
}

interface ButtonRenderer3 {
  command: Command2;
  size: string;
  style: string;
  text: Text4;
  trackingParams: string;
}

interface Command2 {
  clickTrackingParams: string;
  commandExecutorCommand: CommandExecutorCommand;
}

interface CommandExecutorCommand {
  commands: Command3[];
}

interface Command3 {
  browseEndpoint?: BrowseEndpoint2;
  clickTrackingParams?: string;
  commandMetadata: CommandMetadata7;
  feedbackEndpoint?: FeedbackEndpoint;
}

interface BrowseEndpoint2 {
  browseId: string;
  params: string;
}

interface CommandMetadata7 {
  webCommandMetadata: WebCommandMetadata7;
}

interface WebCommandMetadata7 {
  apiUrl: string;
  rootVe?: number;
  url?: string;
  webPageType?: string;
  sendPost?: boolean;
}

interface FeedbackEndpoint {
  feedbackToken: string;
  uiActions: UiActions;
}

interface UiActions {
  hideEnclosingContainer: boolean;
}

interface Text4 {
  runs: Run8[];
}

interface Run8 {
  text: string;
}

interface DismissButton {
  buttonRenderer: ButtonRenderer4;
}

interface ButtonRenderer4 {
  command: Command4;
  size: string;
  style: string;
  text: Text5;
  trackingParams: string;
}

interface Command4 {
  clickTrackingParams: string;
  commandExecutorCommand: CommandExecutorCommand2;
}

interface CommandExecutorCommand2 {
  commands: Command5[];
}

interface Command5 {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata8;
  feedbackEndpoint: FeedbackEndpoint2;
}

interface CommandMetadata8 {
  webCommandMetadata: WebCommandMetadata8;
}

interface WebCommandMetadata8 {
  apiUrl: string;
  sendPost: boolean;
}

interface FeedbackEndpoint2 {
  feedbackToken: string;
  uiActions: UiActions2;
}

interface UiActions2 {
  hideEnclosingContainer: boolean;
}

interface Text5 {
  runs: Run9[];
}

interface Run9 {
  text: string;
}

interface ImpressionEndpoint {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata9;
  feedbackEndpoint: FeedbackEndpoint3;
}

interface CommandMetadata9 {
  webCommandMetadata: WebCommandMetadata9;
}

interface WebCommandMetadata9 {
  apiUrl: string;
  sendPost: boolean;
}

interface FeedbackEndpoint3 {
  feedbackToken: string;
  uiActions: UiActions3;
}

interface UiActions3 {
  hideEnclosingContainer: boolean;
}

interface MessageText {
  runs: Run10[];
}

interface Run10 {
  text: string;
}

interface MessageTitle {
  runs: Run11[];
}

interface Run11 {
  text: string;
}

interface TooltipRenderer {
  detailsText: DetailsText;
  dismissButton: DismissButton2;
  dismissStrategy: DismissStrategy;
  dwellTimeMs: string;
  promoConfig: PromoConfig;
  suggestedPosition: SuggestedPosition;
  targetId: string;
  text: Text7;
  trackingParams: string;
}

interface DetailsText {
  runs: Run12[];
}

interface Run12 {
  text: string;
}

interface DismissButton2 {
  buttonRenderer: ButtonRenderer5;
}

interface ButtonRenderer5 {
  command: Command6;
  size: string;
  text: Text6;
  trackingParams: string;
}

interface Command6 {
  clickTrackingParams: string;
  commandExecutorCommand: CommandExecutorCommand3;
}

interface CommandExecutorCommand3 {
  commands: Command7[];
}

interface Command7 {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata10;
  feedbackEndpoint: FeedbackEndpoint4;
}

interface CommandMetadata10 {
  webCommandMetadata: WebCommandMetadata10;
}

interface WebCommandMetadata10 {
  apiUrl: string;
  sendPost: boolean;
}

interface FeedbackEndpoint4 {
  feedbackToken: string;
  uiActions: UiActions4;
}

interface UiActions4 {
  hideEnclosingContainer: boolean;
}

interface Text6 {
  runs: Run13[];
}

interface Run13 {
  text: string;
}

interface DismissStrategy {
  type: string;
}

interface PromoConfig {
  acceptCommand: AcceptCommand;
  dismissCommand: DismissCommand;
  impressionEndpoints: ImpressionEndpoint2[];
  promoId: string;
}

interface AcceptCommand {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata11;
  feedbackEndpoint: FeedbackEndpoint5;
}

interface CommandMetadata11 {
  webCommandMetadata: WebCommandMetadata11;
}

interface WebCommandMetadata11 {
  apiUrl: string;
  sendPost: boolean;
}

interface FeedbackEndpoint5 {
  feedbackToken: string;
  uiActions: UiActions5;
}

interface UiActions5 {
  hideEnclosingContainer: boolean;
}

interface DismissCommand {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata12;
  feedbackEndpoint: FeedbackEndpoint6;
}

interface CommandMetadata12 {
  webCommandMetadata: WebCommandMetadata12;
}

interface WebCommandMetadata12 {
  apiUrl: string;
  sendPost: boolean;
}

interface FeedbackEndpoint6 {
  feedbackToken: string;
  uiActions: UiActions6;
}

interface UiActions6 {
  hideEnclosingContainer: boolean;
}

interface ImpressionEndpoint2 {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata13;
  feedbackEndpoint: FeedbackEndpoint7;
}

interface CommandMetadata13 {
  webCommandMetadata: WebCommandMetadata13;
}

interface WebCommandMetadata13 {
  apiUrl: string;
  sendPost: boolean;
}

interface FeedbackEndpoint7 {
  feedbackToken: string;
  uiActions: UiActions7;
}

interface UiActions7 {
  hideEnclosingContainer: boolean;
}

interface SuggestedPosition {
  type: string;
}

interface Text7 {
  runs: Run14[];
}

interface Run14 {
  text: string;
}

interface Microformat {
  playerMicroformatRenderer: PlayerMicroformatRenderer;
}

interface PlayerMicroformatRenderer {
  availableCountries: string[];
  category: string;
  description: Description;
  embed: Embed;
  externalChannelId: string;
  hasYpcMetadata: boolean;
  isFamilySafe: boolean;
  isUnlisted: boolean;
  lengthSeconds: string;
  ownerChannelName: string;
  ownerProfileUrl: string;
  publishDate: string;
  thumbnail: Thumbnail3;
  title: Title2;
  uploadDate: string;
  viewCount: string;
}

interface Description {
  simpleText: string;
}

interface Embed {
  flashSecureUrl: string;
  flashUrl: string;
  height: number;
  iframeUrl: string;
  width: number;
}

interface Thumbnail3 {
  thumbnails: Thumbnail4[];
}

interface Thumbnail4 {
  height: number;
  url: string;
  width: number;
}

interface Title2 {
  simpleText: string;
}

interface PlayabilityStatus {
  contextParams: string;
  miniplayer: Miniplayer;
  playableInEmbed: boolean;
  status: string;
}

interface Miniplayer {
  miniplayerRenderer: MiniplayerRenderer;
}

interface MiniplayerRenderer {
  playbackMode: string;
}

interface PlaybackTracking {
  atrUrl: AtrUrl;
  ptrackingUrl: PtrackingUrl;
  qoeUrl: QoeUrl;
  videostatsDefaultFlushIntervalSeconds: number;
  videostatsDelayplayUrl: VideostatsDelayplayUrl;
  videostatsPlaybackUrl: VideostatsPlaybackUrl;
  videostatsScheduledFlushWalltimeSeconds: number[];
  videostatsWatchtimeUrl: VideostatsWatchtimeUrl;
}

interface AtrUrl {
  baseUrl: string;
  elapsedMediaTimeSeconds: number;
}

interface PtrackingUrl {
  baseUrl: string;
}

interface QoeUrl {
  baseUrl: string;
}

interface VideostatsDelayplayUrl {
  baseUrl: string;
}

interface VideostatsPlaybackUrl {
  baseUrl: string;
}

interface VideostatsWatchtimeUrl {
  baseUrl: string;
}

interface PlayerConfig {
  audioConfig: AudioConfig;
  mediaCommonConfig: MediaCommonConfig;
  streamSelectionConfig: StreamSelectionConfig;
  webPlayerConfig: WebPlayerConfig;
}

interface AudioConfig {
  enablePerFormatLoudness: boolean;
  loudnessDb: number;
  perceptualLoudnessDb: number;
}

interface MediaCommonConfig {
  dynamicReadaheadConfig: DynamicReadaheadConfig;
}

interface DynamicReadaheadConfig {
  maxReadAheadMediaTimeMs: number;
  minReadAheadMediaTimeMs: number;
  readAheadGrowthRateMs: number;
}

interface StreamSelectionConfig {
  maxBitrate: string;
}

interface WebPlayerConfig {
  useCobaltTvosDash: boolean;
  webPlayerActionsPorting: WebPlayerActionsPorting;
}

interface WebPlayerActionsPorting {
  addToWatchLaterCommand: AddToWatchLaterCommand;
  getSharePanelCommand: GetSharePanelCommand;
  removeFromWatchLaterCommand: RemoveFromWatchLaterCommand;
  subscribeCommand: SubscribeCommand;
  unsubscribeCommand: UnsubscribeCommand;
}

interface AddToWatchLaterCommand {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata14;
  playlistEditEndpoint: PlaylistEditEndpoint;
}

interface CommandMetadata14 {
  webCommandMetadata: WebCommandMetadata14;
}

interface WebCommandMetadata14 {
  apiUrl: string;
  sendPost: boolean;
}

interface PlaylistEditEndpoint {
  actions: Action3[];
  playlistId: string;
}

interface Action3 {
  action: string;
  addedVideoId: string;
}

interface GetSharePanelCommand {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata15;
  webPlayerShareEntityServiceEndpoint: WebPlayerShareEntityServiceEndpoint;
}

interface CommandMetadata15 {
  webCommandMetadata: WebCommandMetadata15;
}

interface WebCommandMetadata15 {
  apiUrl: string;
  sendPost: boolean;
}

interface WebPlayerShareEntityServiceEndpoint {
  serializedShareEntity: string;
}

interface RemoveFromWatchLaterCommand {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata16;
  playlistEditEndpoint: PlaylistEditEndpoint2;
}

interface CommandMetadata16 {
  webCommandMetadata: WebCommandMetadata16;
}

interface WebCommandMetadata16 {
  apiUrl: string;
  sendPost: boolean;
}

interface PlaylistEditEndpoint2 {
  actions: Action4[];
  playlistId: string;
}

interface Action4 {
  action: string;
  removedVideoId: string;
}

interface SubscribeCommand {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata17;
  subscribeEndpoint: SubscribeEndpoint2;
}

interface CommandMetadata17 {
  webCommandMetadata: WebCommandMetadata17;
}

interface WebCommandMetadata17 {
  apiUrl: string;
  sendPost: boolean;
}

interface SubscribeEndpoint2 {
  channelIds: string[];
  params: string;
}

interface UnsubscribeCommand {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata18;
  unsubscribeEndpoint: UnsubscribeEndpoint2;
}

interface CommandMetadata18 {
  webCommandMetadata: WebCommandMetadata18;
}

interface WebCommandMetadata18 {
  apiUrl: string;
  sendPost: boolean;
}

interface UnsubscribeEndpoint2 {
  channelIds: string[];
  params: string;
}

interface ResponseContext {
  mainAppWebResponseContext: MainAppWebResponseContext;
  serviceTrackingParams: ServiceTrackingParam[];
  visitorData: string;
  webResponseContextExtensionData: WebResponseContextExtensionData;
}

interface MainAppWebResponseContext {
  loggedOut: boolean;
}

interface ServiceTrackingParam {
  params: Param[];
  service: string;
}

interface Param {
  key: string;
  value: string;
}

interface WebResponseContextExtensionData {
  hasDecorated: boolean;
}

interface Storyboards {
  playerStoryboardSpecRenderer: PlayerStoryboardSpecRenderer;
}

interface PlayerStoryboardSpecRenderer {
  spec: string;
}

interface StreamingData {
  adaptiveFormats: AdaptiveFormat[];
  expiresInSeconds: string;
  formats: Format[];
}

interface AdaptiveFormat {
  approxDurationMs: string;
  averageBitrate: number;
  bitrate: number;
  contentLength: string;
  fps?: number;
  height?: number;
  indexRange: IndexRange;
  initRange: InitRange;
  itag: number;
  lastModified: string;
  mimeType: string;
  projectionType: string;
  quality: string;
  qualityLabel?: string;
  url: string;
  width?: number;
  colorInfo?: ColorInfo;
  highReplication?: boolean;
  audioChannels?: number;
  audioQuality?: string;
  audioSampleRate?: string;
  loudnessDb?: number;
}

interface IndexRange {
  end: string;
  start: string;
}

interface InitRange {
  end: string;
  start: string;
}

interface ColorInfo {
  matrixCoefficients: string;
  primaries: string;
  transferCharacteristics: string;
}

interface Format {
  approxDurationMs: string;
  audioChannels: number;
  audioQuality: string;
  audioSampleRate: string;
  bitrate: number;
  fps: number;
  height: number;
  itag: number;
  lastModified: string;
  mimeType: string;
  projectionType: string;
  quality: string;
  qualityLabel: string;
  url: string;
  width: number;
}

interface VideoDetails {
  allowRatings: boolean;
  author: string;
  channelId: string;
  isCrawlable: boolean;
  isLiveContent: boolean;
  isOwnerViewing: boolean;
  isPrivate: boolean;
  isUnpluggedCorpus: boolean;
  keywords: string[];
  lengthSeconds: string;
  shortDescription: string;
  thumbnail: Thumbnail5;
  title: string;
  videoId: string;
  viewCount: string;
}

interface Thumbnail5 {
  thumbnails: Thumbnail6[];
}

interface Thumbnail6 {
  height: number;
  url: string;
  width: number;
}
