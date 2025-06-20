import { FC, ReactNode } from 'react';
import { cn } from '@learnway/shared';
import styles from './contents-row.module.css';

interface ContentsRowProps {
  children: ReactNode;
  className?: string;
  type?: string;
  titleMode?: boolean;
}

const ContentsRowComponent: FC<ContentsRowProps> = ({ children, className, type, titleMode }) => {
  return (
    <div
      className={cn(
        styles.row,
        className,
        'nlp--contents-row',
        type && styles[type],
        titleMode && styles.title_mode,
      )}
    >
      {children}
    </div>
  );
};
ContentsRowComponent.displayName = 'ContentsRow';

export const ContentsRow = ContentsRowComponent;
