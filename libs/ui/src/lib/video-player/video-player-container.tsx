import type { VideoPlayerContainerProps } from './types';
import { forwardRef, PropsWithChildren, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import LessonTitle from './components/lesson-title';
import BottomProgressBar from './components/bottom-progress-bar';
import CentralControlButton from './components/central-control-button';

import styles from './video-player-container.module.css';

const AUTO_HIDE_DELAY = 3000; // 3
type VideoPlayerContainerPlayerProps = {
  player: VideoPlayerContainerProps;
} & PropsWithChildren;

const VideoPlayerContainerComponent = forwardRef<HTMLDivElement, VideoPlayerContainerPlayerProps>(
  ({ children, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      const container = (ref as React.RefObject<HTMLDivElement>)?.current;
      if (!container) return;

      const handleMouseMove = () => {
        setIsHovered(true);

        // 타이머 초기화 후 다시 설정
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setIsHovered(false);
        }, AUTO_HIDE_DELAY);
      };

      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseMove);

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseMove);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);

    return (
      <div className={`${styles.start} ${styles.video_player}`}>
        <div
          ref={ref}
          className={styles.container}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {children}

          {/* 상단 왼쪽 */}

          {/* 중앙 제어 버튼 */}
          <div className={`${styles.central_control} ${isHovered || styles.hide}`}>
            <CentralControlButton {...props.player} />
          </div>

          {/* 하단 진행바 */}
          <div className={`${styles.progress_bar} ${isHovered || styles.hide}`}>
            <BottomProgressBar {...props.player} />
          </div>
        </div>
      </div>
    );
  },
);

VideoPlayerContainerComponent.displayName = 'VideoPlayerContainer';

export const VideoPlayerContainer = VideoPlayerContainerComponent;
