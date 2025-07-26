import { PropsWithChildren, RefObject } from 'react';
import ReactPlayer from 'react-player';

export type VideoPlayerContainerProps = {
  //for Video
  /**
   * react-player의 url 정보
   */
  playUrl?: string;
  /**
   * react-player 용 ref
   */
  playerRef: RefObject<ReactPlayer>;
  /**
   * react-player config 자막 정보
   */
  videoConfig: any;
  /**
   * react-player 구동 여부
   */
  playing: boolean;
  /**
   * react-player 볼륨 값
   */
  volume: number;
  /**
   * react-player muted 여부
   */
  muted: boolean;

  /**
   * player controler ref
   */
  playerContainerRef: RefObject<HTMLDivElement>;
  videoSubtitles?: any[];
  encodedVideos?: any[];

  showCurriculumSection?: boolean;

  isFullscreen: boolean;
  currentTime: number;

  duration: number;
  played: number; // 0.0 ~ 1.0

  subtitlesVisible: boolean;

  videoQuality: any;

  toggleMute: () => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleSubtitles: () => void;
  toggleFullscreen: () => void;
  togglePlay: () => void;
  handleRewind: () => void;
  handleForward: () => void;
  handleSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
  changePlaybackRate: (rate: number) => void;
  changeQuality: (v: any) => void;
  formatTime: (v: number) => string;

  setPlayUrl: (v: string) => void;
  setVideoInfo: (v: any) => void;
  setSeconds: (v: number) => void;
  onProgress: (v: any) => void;
  onDuration: (v: any) => void;
  onBuffer: (v: any) => void;
  onReady: (v: any) => void;

  //Lesson 이동 처리
  goBeforeLesson: () => void;
  goNextLesson: () => void;

  videoStart: number;
  setVideoStart: (v: number) => void;

  selectedSubtitle: any;
  changeSubtitle: (v: any) => void;
  playbackRate: number;
} & PropsWithChildren;
