export interface VideoState {
  playing: boolean;
  volume: number;
  progress: number;
  duration: number;
  fullscreen: boolean;
  showSubtitles: boolean;
  played: number;
  muted: boolean;
  loaded: number;
  seeking: boolean;
  allowSeek?: boolean;
  subtitles?: Subtitle[];
  subtitle?: string;
  playbackRate: number;
  watchTime: number; //시청 시간
  lastPlayedTime: number;
  url?: string;
}

/**
 * 나중에 API로 받아야 된다고 생각하는 요소들
 * 비디오 url
 * 마지막 재생 구간
 * 싱크 슬라이더 컨트롤 여부
 * 자막
 */
export interface VideoPlayerProps {
  videoUrl?: string;
  lastPlayed: number;
  getAllowSeek: boolean;
}

export interface Subtitle {
  kind: string;
  src: string;
  srcLang: string;
  label: string;
  default?: boolean;
}

export interface Progress {
  played: number;
  loaded: number;
  playedSeconds: number;
  loadedSeconds: number;
}
