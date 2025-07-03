import { Config } from 'react-player';
import { SourceProps } from 'react-player/base';

export type PlayerProps = {
  url?: string | string[] | SourceProps[] | MediaStream;
  playing: boolean;
  config?: Config;

  onProgress: (state: { played: number; playedSeconds: number }) => void;
  onDuration: (d: number) => void;
};
