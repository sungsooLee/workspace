import { FC, ReactNode } from 'react';
import { cn } from '@learnway/shared';
import styles from './contents-row.module.css';
const ContentsRowComponent: FC<{ children: ReactNode; className?: string; type?: string }> = ({
  children,
  className,
  type,
}) => {
  return (
    <div className={cn(styles.row, className, 'nlp--contents-row', type && styles[type])}>
      {children}
    </div>
  );
};
ContentsRowComponent.displayName = 'ContentsRow';

export const ContentsRow = ContentsRowComponent;
