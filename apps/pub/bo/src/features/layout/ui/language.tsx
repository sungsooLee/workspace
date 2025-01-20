import { memo } from 'react';
import { Avatar, Popover } from '@learnway/ui';
import styles from './language.module.css';

import { cn } from '@learnway/shared';

const PopoverContent = () => {
  return <div></div>;
};

const LanguageComponent = () => {
  return (
    <Popover popoverContent={<PopoverContent />} className={cn('styles.start', 'nlp--language')}>
      <Avatar imageUrl="https://*.png" fallback="KR" className={cn('select')} />
    </Popover>
  );
};

export const Language = memo(LanguageComponent);
