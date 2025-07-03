import { FC, ReactNode } from 'react';
import { cn } from '@learnway/shared';
import styles from './contents-row-item.module.css';

const ContentsRowItemComponent: FC<{ children: ReactNode; className?: string; type?: string }> = ({
  children,
  className,
  type,
}) => {
  return (
    <div className={cn(styles.start, className, 'nlp--contents-row-item', type && styles[type])}>
      {children}
    </div>
  );
};
ContentsRowItemComponent.displayName = 'ContentsRowItem';

export const ContentsRowItem = ContentsRowItemComponent;
