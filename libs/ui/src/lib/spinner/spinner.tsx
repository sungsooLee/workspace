import { BackDrop } from '../backdrop/backdrop';
import { IcoSpinner } from '@learnway/icons';

import styles from './spinner.module.css';
import React, { forwardRef } from 'react';
import { cn } from '@learnway/shared';

/* eslint-disable-next-line */
export interface SpinnerProps {
  isLoading?: boolean;
  className?: string;
  showBackdrop?: boolean;
}

const SpinnerComponent = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, isLoading, showBackdrop }) => {
    return (
      <>
        {isLoading && <IcoSpinner className={cn(styles.spinner, className, 'nlp--spinner')} />}
        {isLoading && showBackdrop ? <BackDrop /> : ''}
      </>
    );
  },
);

export const Spinner = SpinnerComponent;
