import { BackDrop } from '../backdrop/backdrop';
import { IcoSpinner, IcoSpinnerBlue } from '@learnway/icons';

import styles from './spinner.module.css';
import React, { forwardRef } from 'react';
import { cn } from '@learnway/shared';

export interface SpinnerProps {
  isLoading?: boolean;
  className?: string;
  iconType?: 'mint' | 'blue';
  showBackdrop?: boolean;
}

const SpinnerComponent = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, isLoading, showBackdrop, iconType = 'mint' }, ref) => {
    const SpinnerIcon = iconType === 'mint' ? IcoSpinner : IcoSpinnerBlue;

    return (
      <div ref={ref} className={className}>
        {isLoading && <SpinnerIcon className={cn(styles.spinner, className, 'nlp--spinner')} />}
        {isLoading && showBackdrop && <BackDrop />}
      </div>
    );
  },
);

export const Spinner = SpinnerComponent;
