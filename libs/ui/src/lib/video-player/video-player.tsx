import ReactPlayer, { ReactPlayerProps } from 'react-player';
import { forwardRef } from 'react';
import './video-player.module.css';

const VideoPlayerComponent = forwardRef<ReactPlayer, ReactPlayerProps>(
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

VideoPlayerComponent.displayName = 'VideoPlayer';

export const VideoPlayer = VideoPlayerComponent;
