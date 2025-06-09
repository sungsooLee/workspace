import { PropsWithChildren } from 'react';

export type PlayerContainerProps = {
  playing: boolean;
  isFullscreen: boolean;
  currentTime: number;
  muted: boolean;
  duration: number;
  played: number; // 0.0 ~ 1.0
  volume: number;
  toggleMute: () => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleSubtitles: () => void;
  toggleFullscreen: () => void;
  togglePlay: () => void;
  handleRewind: () => void;
  handleForward: () => void;
  handleSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
} & PropsWithChildren;
