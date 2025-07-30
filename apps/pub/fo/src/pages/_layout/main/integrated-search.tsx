import { Popover } from '@learnway/ui';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { SearchDisplay } from '../../../features/layout/ui/integrated-search/search-display'; //

export const Route = createFileRoute('/_layout/main/integrated-search')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const PopoverContent = () => {
    // 이전 버튼 클릭
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const handleBack = () => {
      setIsClicked(true);
    };

    return (
      <SearchDisplay
        searchState={isClicked ? 'typing' : 'submitted'}
        displayFormat={'popover'}
        onBack={handleBack}
      />
    );
  };

  return (
    <div className="text-center">
      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
        popoverContent={<PopoverContent />}
        side="bottom"
        align="center"
        sideOffset={0}
      >
        통합검색
      </Popover>
    </div>
  );
}
