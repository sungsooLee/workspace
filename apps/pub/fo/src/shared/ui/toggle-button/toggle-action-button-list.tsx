// ToggleActionButtonList.tsx
import { cn } from '@learnway/shared';
import React from 'react';
import { ToggleActionButton } from './toggle-action-button';
import styles from './toggle-action-button-list.module.css';

interface ToggleActionButtonListProps {
  commonProps?: Partial<React.ComponentProps<typeof ToggleActionButton>>; // size , rounded
  items: Array<React.ComponentProps<typeof ToggleActionButton>>;
}

export const ToggleActionButtonList: React.FC<ToggleActionButtonListProps> = ({
  commonProps,
  items,
}) => {
  return (
    <div className={cn(styles.start, styles.wrap)}>
      {items.map((props, index) => (
        <ToggleActionButton key={index} {...commonProps} {...props} className={styles.item} />
      ))}
    </div>
  );
};
