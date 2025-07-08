import type { VideoPlayerContainerProps } from './types';
import { forwardRef, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import LessonTitle from './components/lesson-title';
import BottomProgressBar from './components/bottom-progress-bar';

const AUTO_HIDE_DELAY = 3000; // 3

const VideoPlayerContainerComponent = forwardRef<HTMLDivElement, VideoPlayerContainerProps>(
  ({ children, showCurriculumSection, ...props }, ref) => {
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
      <div className={`flex flex-row`}>
        <div
          ref={ref}
          className={`relative flex h-screen w-full bg-black`}
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
          {/* <div
            className={clsx({
              'opacity-100': isHovered,
              'opacity-0': !isHovered,
            })}
          >
            <CentralControlButton {...props} />
          </div> */}

          {/* 오른쪽 사이드 버튼 */}
          {/* {!showCurriculumSection && (
            <div
              className={clsx({
                'opacity-100': isHovered,
                'opacity-0': !isHovered,
              })}
            >
              <RightSideButtons {...props} />
            </div>
          )} */}

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
        {/* {showCurriculumSection && <CurriculumSidebar {...props} />}
        {showCurriculumSection && <RightSideBar {...props} />} */}
      </div>
    );
  },
);

VideoPlayerContainerComponent.displayName = 'VideoPlayerContainer';

export const VideoPlayerContainer = VideoPlayerContainerComponent;
