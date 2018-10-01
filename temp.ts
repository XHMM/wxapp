
interface GetBackgroundAudioPlayerStateResult {
  duration: number;
  currentPosition: number;
  status: 2 | 1 | 0;
  downloadPercent: number;
  dataUrl: string;
}
interface GetBackgroundAudioPlayerStateOptions extends BaseOptions {
  success?: (res?: GetBackgroundAudioPlayerStateResult) => void;
}
interface PlayBackgroundAudioOptions extends BaseOptions {
  dataUrl: string;
  title?: string;
  coverImgUrl?: string;
}
interface SeekBackgroundAudioOptions extends BaseOptions {
  position: number;
}
function getBackgroundAudioPlayerState(
  options?: GetBackgroundAudioPlayerStateOptions
): void;
function playBackgroundAudio(options: PlayBackgroundAudioOptions): void;

function pauseBackgroundAudio(): void;
function seekBackgroundAudio(options: SeekBackgroundAudioOptions): void;
function stopBackgroundAudio(): void;
function onBackgroundAudioPlay(callback: (res?: any) => void): void;
function onBackgroundAudioPause(callback: (res?: any) => void): void;
function onBackgroundAudioStop(callback: (res?: any) => void): void;
//-------背景音乐播放管理
interface BackgroundAudioManager {
  readonly duration: number;
  readonly currentTime: number;
  readonly paused: boolean;
  src: string;
  startTime: number;
  readonly buffered: number;
  title: string;
  epname: string;
  singer: string;
  coverImageUrl: string;
  webUrl: string;
  protocol: string;
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (position: number) => void;
  onCanplay: (callback: () => void) => void;
  onPlay: (callback: () => void) => void;
  onSeeking:(callback: () => void) => void;
  onSeeked:(callback: () => void) => void;
  onPause: (callback: () => void) => void;
  onStop: (callback: () => void) => void;
  onEnded: (callback: () => void) => void;
  onTimeUpdate: (callback: () => void) => void;
  onPrev: (callback: () => void) => void;
  onNext: (callback: () => void) => void;
  onError: (callback: (res?: any) => void) => void;
  onWaiting: (callback: () => void) => void;
}
function getBackgroundAudioManager(): BackgroundAudioManager;

interface GetRecorderManagerResult {
  audioSources: string[];
}
interface GetRecorderManagerOptions extends BaseOptions {
  success: (res?: GetRecorderManagerResult) => void;
}

function getRecorderManager(): void;





interface LogManager {
  log(message?: any, ...optionalParams: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
  debug(message?: any, ...optionalParams: any[]): void;
}
function getLogManager(): LogManager;
