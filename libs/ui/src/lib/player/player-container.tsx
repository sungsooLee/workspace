import type { PlayerContainerProps } from './types';
import { forwardRef, useEffect, useRef, useState } from 'react';
import LessonTitle from './components/lesson-title';
import CentralControlButton from './components/central-control-button';
import BottomProgressBar from './components/bottom-progress-bar';
import RightSideButtons from './components/right-side-buttons';
import clsx from 'clsx';

const AUTO_HIDE_DELAY = 3000; // 3

const PlayerContainerComponent = forwardRef<HTMLDivElement, PlayerContainerProps>(
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
      <div
        ref={ref}
        className="relative h-screen w-full bg-black"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}

        {/* 상단 왼쪽 */}
        <div
          className={clsx({
            'opacity-100': isHovered,
            'opacity-0': !isHovered,
          })}
        >
          <LessonTitle lessonTitle="Title" />
        </div>

        {/* 중앙 제어 버튼 */}
        <div
          className={clsx({
            'opacity-100': isHovered,
            'opacity-0': !isHovered,
          })}
        >
          <CentralControlButton {...props} />
        </div>

        {/* 오른쪽 사이드 버튼 */}
        <div
          className={clsx({
            'opacity-100': isHovered,
            'opacity-0': !isHovered,
          })}
        >
          <RightSideButtons />
        </div>

        {/* 하단 진행바 */}
        <div
          className={clsx({
            'opacity-100': isHovered,
            'opacity-0': !isHovered,
          })}
        >
          <BottomProgressBar {...props} />
        </div>
      </div>
    );
  },
);

PlayerContainerComponent.displayName = 'PlayerContainer';

export const PlayerContainer = PlayerContainerComponent;
