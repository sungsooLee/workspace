import { List, Pencil, MessageSquare, Headphones, SkipBack, SkipForward } from 'lucide-react';

const RightSideButtons = () => {
  return (
    <div className="absolute right-4 top-1/4 flex flex-col items-center gap-6 text-gray-700">
      {/* 상단 메뉴 박스 */}
      <div className="flex flex-col items-center gap-6 rounded-[28px] bg-white/90 px-6 py-8 shadow-md">
        <div className="flex flex-col items-center gap-2">
          <List size={28} />
          <span className="text-sm font-medium">커리큘럼</span>
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
      <div className="mt-4 flex flex-col items-center gap-6 rounded-[28px] bg-white/90 px-6 py-6 shadow-md">
        <div className="flex flex-col items-center gap-2">
          <SkipBack size={28} />
          <span className="text-sm font-medium">이전</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <SkipForward size={28} />
          <span className="text-sm font-medium">다음</span>
        </div>
      </div>
    </div>
  );
};

export default RightSideButtons;
