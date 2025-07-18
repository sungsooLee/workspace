import { Config } from 'react-player';
import { SourceProps } from 'react-player/base';

export type VideoPlayerProps = {
  url?: string | string[] | SourceProps[] | MediaStream;
  progressInterval?: number;
  playing: boolean;
  config?: Config;

  onProgress: (state: { played: number; playedSeconds: number }) => void;
  onDuration: (d: number) => void;
  onEnded?: () => void;
};
