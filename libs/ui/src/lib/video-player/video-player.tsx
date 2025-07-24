import ReactPlayer, { ReactPlayerProps } from 'react-player';
import { forwardRef, useEffect, useState } from 'react';
import './video-player.module.css';
import { is } from 'date-fns/locale';

const VideoPlayerComponent = forwardRef<ReactPlayer, ReactPlayerProps>(
  ({ url, playing, onProgress, onDuration, ...props }, ref) => {
    const [playerUri, setPlayerUri] = useState<any>();

    const [isMounted, setIsMounted] = useState(false);

    // ReactPlayer에서 사용하지 않는 props 제거
    const { toggleCurriculumSection, playerRef, playerContainerRef, ...newPros } = props;

    // 초기 설정
    const initialConfig = {
      namespace: 'MyPlayer',
      width: '100%',
      height: '100%',
      onError: (error: Error, data: any) => {
        console.log('React Player Error:', error, data);
      },
      ...newPros,
    };

    useEffect(() => {
      if (url) {
        setTimeout(() => {
          setIsMounted(true);
        }, 1);
        setIsMounted(false);
        setPlayerUri(url);
      }
    }, [url]);

    useEffect(() => {
      console.log('change ed', props.config);
    }, [props.config]);

    return (
      isMounted &&
      playerUri && (
        <ReactPlayer
          {...initialConfig}
          ref={ref}
          url={playerUri}
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
