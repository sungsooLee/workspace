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
>(({ className, value, label, isFailed = false, ...props }, ref) => {
  const [progress, setProgress] = React.useState(value);
  const progressClass =
    progress >= 100 ? 'completed' : progress >= 90 ? 'nearly' : progress === 0 ? 'waiting' : '';

  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 50);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className={cn(styles.progress_wrap, styles[progressClass], isFailed ? styles.error : '')}>
      {label && <p className={styles.progress_status}>{label}</p>}
      <Primitive.Root className={cn(styles.start, className, 'nlp--progress')} value={progress}>
        <Primitive.Indicator
          className={styles.indicator}
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Primitive.Root>
    </div>
  );
});

export const Progress = ProgressComponent;
