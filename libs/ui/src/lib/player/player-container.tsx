import type { PlayerContainerProps } from './types';
import { forwardRef } from 'react';
import LessonTitle from './components/lesson-title';
import CentralControlButton from './components/central-control-button';
import BottomProgressBar from './components/bottom-progress-bar';
import RightSideButtons from './components/right-side-buttons';

const PlayerContainerComponent = forwardRef<HTMLDivElement, PlayerContainerProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} className="relative h-screen w-full bg-black">
        {children}
        {/* 상단 왼쪽 */}
        <LessonTitle lessonTitle="Title" />

        {/* 중앙 제어 버튼 */}
        <CentralControlButton {...props} />

        {/* 오른쪽 사이드 버튼 */}
        <RightSideButtons />

        {/* 하단 진행바 */}
        <BottomProgressBar {...props} />
      </div>
    );
  },
);

PlayerContainerComponent.displayName = 'PlayerContainer';

export const PlayerContainer = PlayerContainerComponent;
