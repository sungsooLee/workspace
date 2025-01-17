import { memo } from 'react';
import { Avatar, Popover } from '@learnway/ui';

const PopoverContent = () => {
  return <div></div>;
};

const LanguageComponent = () => {
  return (
    <Popover popoverContent={<PopoverContent />}>
      <Avatar imageUrl="https://*.png" fallback="Lang" />
    </Popover>
  );
};

export const Language = memo(LanguageComponent);
