import type { PlayerContainerProps } from './types';
import { forwardRef } from 'react';
import LessonTitle from './components/lesson-title';
import CentralControlButton from './components/central-control-button';
import BottomProgressBar from './components/bottom-progress-bar';

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
        {/* <div className="absolute right-4 top-1/4 flex flex-col gap-4 text-white">
          <button className="rounded bg-white/10 p-2">커리큘럼</button>
          <button className="rounded bg-white/10 p-2">노트</button>
          <button className="rounded bg-white/10 p-2">커뮤니티</button>
          <button className="rounded bg-white/10 p-2">FAQ</button>
          <button className="rounded bg-white/10 p-2">이전</button>
          <button className="rounded bg-white/10 p-2">다음</button>
        </div> */}

        {/* 하단 진행바 */}
        <BottomProgressBar {...props} />
      </div>
    );
  },
);

PlayerContainerComponent.displayName = 'PlayerContainer';

export const PlayerContainer = PlayerContainerComponent;
