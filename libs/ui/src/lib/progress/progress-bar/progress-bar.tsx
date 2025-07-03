import React, { forwardRef } from 'react';

import { cn } from '@learnway/shared';

import * as Primitive from '@radix-ui/react-progress';

import styles from './progress-bar.module.css';

interface ProgressBarProps extends React.ComponentProps<typeof Primitive.Root> {
  progress: number;
  label?: string;
  className?: string;
  isFailed?: boolean;
}

const ProgressBarComponent = forwardRef<React.ElementRef<typeof Primitive.Root>, ProgressBarProps>(
  ({ className, progress, label, isFailed = false }, ref) => {
    const progressClass = progress >= 100 ? 'completed' : progress === 0 ? 'waiting' : '';

    return (
      <div
        ref={ref}
        className={cn(styles.progress_wrap, styles[progressClass], isFailed ? styles.error : '')}
      >
        {label && <p className={styles.progress_status}>{label}</p>}
        <Primitive.Root className={cn(styles.start, className, 'nlp--progress')} value={progress}>
          <Primitive.Indicator
            className={styles.indicator}
            style={{ transform: `translateX(-${100 - progress}%)` }}
          />
        </Primitive.Root>
      </div>
    );
  },
);

export const ProgressBar = ProgressBarComponent;
