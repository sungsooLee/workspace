import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import { BackDrop } from '../backdrop/backdrop';

/* eslint-disable-next-line */
export interface SpinnerProps {
  isLoading?: boolean;
  className?: string;
  showBackdrop?: boolean;
}

export function Spinner({ className, isLoading, showBackdrop }: SpinnerProps) {
  const { t } = useTranslation();
  /**
   * size
   * delay
   */
  return (
    <>
      {isLoading && <div>{t('LOADING')}...</div>}
      {isLoading && showBackdrop ? <BackDrop /> : ''}
    </>
  );
}

export default Spinner;

//export const Spinner = memo(Spinner);
