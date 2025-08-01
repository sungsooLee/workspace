import { Popover } from '@learnway/ui/popover';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  SearchDisplay,
  SearchState,
} from '../../../features/layout/ui/integrated-search/search-display';

export const Route = createFileRoute('/_layout/main/integrated-search')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const PopoverContent = () => {
    const [searchState, setSearchState] = useState<SearchState>('before'); // 화면 초기 설정

    const handleBack = () => {
      setSearchState('typing');
    };

    const handleSubmit = () => {
      setSearchState('submitted');
    };

    return (
      <SearchDisplay
        searchState={searchState}
        displayFormat={'popover'}
        onBack={handleBack}
        onSubmitSearch={handleSubmit}
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
