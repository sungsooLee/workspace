import { createFileRoute } from '@tanstack/react-router';
import { Popover } from '@learnway/ui';
import { SearchDisplay } from '../../../features/layout/ui/integrated-search/search-display'; //

export const Route = createFileRoute('/_layout/main/integrated-search')({
  component: RouteComponent,
});

const PopoverContent = () => {
  return <SearchDisplay searchState={'before'} displayFormat={'popover'} />;
};

function RouteComponent() {
  return (
    <div className="text-center">
      <Popover popoverContent={<PopoverContent />} side="bottom" align="center" sideOffset={0}>
        통합검색
      </Popover>
    </div>
  );
}
