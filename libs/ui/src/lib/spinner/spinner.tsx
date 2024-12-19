import { memo } from 'react';

import { cn } from '@learnway/shared';

import { BackDrop } from '../backdrop/backdrop';

/* eslint-disable-next-line */
export interface SpinnerProps {
  isLoading?: boolean;
  className?: string;
  showBackdrop?: boolean;
}

export function Spinner({ className, isLoading, showBackdrop }: SpinnerProps) {
  /**
   * size
   * delay
   */
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isLoading && showBackdrop ? <BackDrop /> : ''}
    </>
  );
}

//export const Spinner = memo(Spinner);
