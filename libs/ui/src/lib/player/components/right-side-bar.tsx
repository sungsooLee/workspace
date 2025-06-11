import { Pencil, MessageSquare, Headphones, SkipBack, SkipForward } from 'lucide-react';
import { PlayerContainerProps } from '../types';
import { IcoList } from '@learnway/icons';

const RightSideBar = ({
  toggleCurriculumSection,
}: Pick<PlayerContainerProps, 'toggleCurriculumSection'>) => {
  return (
    <aside className="flex h-screen flex-col justify-between bg-white p-4 text-[#111]">
      {/* 상단 메뉴 박스 */}
      <div className="flex flex-col items-center gap-6 bg-white/90 px-6 py-8">
        <div className="flex flex-col items-center gap-2">
          <IcoList className="fill-[#00AFD5]" />
          <span className="text-sm font-medium text-[#00AFD5]">커리큘럼</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Pencil size={28} />
          <span className="text-sm font-medium">내노트</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MessageSquare size={28} />
          <span className="text-sm font-medium">커뮤니티</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Headphones size={28} />
          <span className="text-sm font-medium">FAQ</span>
        </div>
      </div>

      {/* 하단 이동 버튼 박스 */}
      <div className="mt-4 flex flex-col items-center gap-6 bg-white/90 px-6 py-6">
        <div className="flex flex-col items-center gap-2">
          <SkipBack size={28} />
          <span className="text-sm font-medium">이전</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <SkipForward size={28} />
          <span className="text-sm font-medium">다음</span>
        </div>
      </div>
    </aside>
  );
};

export default RightSideBar;
