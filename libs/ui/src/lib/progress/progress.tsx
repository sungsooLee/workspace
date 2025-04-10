import React, { forwardRef, useEffect } from 'react';

import { cn } from '@learnway/shared';

import * as Primitive from '@radix-ui/react-progress';

import styles from './progress.module.css';

interface ProgressComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  value: number;
  label?: string;
  className?: string;
  isFailed?: boolean;
}

const ProgressComponent = forwardRef<
  React.ElementRef<typeof Primitive.Root>,
  ProgressComponentProps
>(({ className, value, label, isFailed = false }, ref) => {
  const progressClass = value >= 100 ? 'completed' : value === 0 ? 'waiting' : '';

  return (
    <div
      ref={ref}
      className={cn(styles.progress_wrap, styles[progressClass], isFailed ? styles.error : '')}>
      {label && <p className={styles.progress_status}>{label}</p>}
      <Primitive.Root className={cn(styles.start, className, 'nlp--progress')} value={value}>
        <Primitive.Indicator
          className={styles.indicator}
          style={{ transform: `translateX(-${100 - value}%)` }}
        />
      </Primitive.Root>
    </div>
  );
});

export const Progress = ProgressComponent;
