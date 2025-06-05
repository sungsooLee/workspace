import ReactPlayer from 'react-player';
import { forwardRef } from 'react';
import type { PlayerProps } from './types';

const PlayerComponent = forwardRef<ReactPlayer, PlayerProps>(
  ({ url, playing, onProgress, onDuration, ...props }, ref) => {
    // 초기 설정
    const initialConfig = {
      namespace: 'MyPlayer',
      width: '100%',
      height: '100%',
      onError: (error: Error) => {
        console.error('React Player Error:', error);
      },
    };

    return (
      <ReactPlayer
        {...initialConfig}
        ref={ref}
        url={url || 'https://filesamples.com/samples/video/mp4/sample_640x360.mp4'}
        playing={playing}
        onProgress={onProgress}
        onDuration={onDuration}
        {...props}
      />
    );
  },
);

PlayerComponent.displayName = 'Player';

export const Player = PlayerComponent;
