import ReactPlayer, { ReactPlayerProps } from 'react-player';
import { forwardRef, useEffect, useState } from 'react';
import './video-player.module.css';

const VideoPlayerComponent = forwardRef<ReactPlayer, ReactPlayerProps>(
  ({ url, playing, onProgress, onDuration, ...props }, ref) => {
    const [isMounted, setIsMounted] = useState(false);

    // ReactPlayer에서 사용하지 않는 props 제거
    const { toggleCurriculumSection, playerRef, playerContainerRef, ...newPros } = props;

    // 초기 설정
    const initialConfig = {
      namespace: 'MyPlayer',
      width: '100%',
      height: '100%',
      onError: (error: Error) => {
        console.error('React Player Error:', error);
      },
      ...newPros,
    };

    useEffect(() => {
      setIsMounted(true);
    }, []);
    return (
      isMounted && (
        <ReactPlayer
          {...initialConfig}
          ref={ref}
          url={url || 'https://filesamples.com/samples/video/mp4/sample_640x360.mp4'}
          playing={playing}
          onProgress={onProgress}
          onDuration={onDuration}
        />
      )
    );
  },
);

VideoPlayerComponent.displayName = 'VideoPlayer';

export const VideoPlayer = VideoPlayerComponent;
