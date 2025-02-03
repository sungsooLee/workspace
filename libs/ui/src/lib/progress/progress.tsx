import React, { forwardRef, memo, ReactNode, useEffect } from 'react';

import { cn } from '@learnway/shared';

import * as Primitive from "@radix-ui/react-progress";

import styles from './progress.module.css';

interface ProgressComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  value: number;
  className?: string;
}

const ProgressComponent = forwardRef<React.ElementRef<typeof Primitive.Root>, ProgressComponentProps>(
  ({ className, value, ...props }, ref) => {
    const [progress, setProgress] = React.useState(value);

    useEffect(() => {
      const timer = setTimeout(() => setProgress(value), 500);
      return () => clearTimeout(timer);
    }, [value])

    return (
      <Primitive.Root className={cn(styles.Root, className, 'nlp--progress')} value={progress}>
        <Primitive.Indicator
          className={styles.Indicator}
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Primitive.Root>
    );
  },
);

export const Progress = memo(ProgressComponent);
