import { BackDrop } from '../backdrop/backdrop';
import { IcoSpinner, IcoSpinnerBlue } from '@learnway/icons';

import styles from './spinner.module.css';
import React, { forwardRef } from 'react';
import { cn } from '@learnway/shared';

export interface SpinnerProps {
  isLoading?: boolean;
  className?: string;
  iconType?: 'mint' | 'blue' | 'dots';
  showBackdrop?: boolean;
}

const SpinnerComponent = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, isLoading, showBackdrop, iconType = 'mint' }, ref) => {
    const renderSpinnerByType = (type: SpinnerProps['iconType']) => {
      if (type === 'dots') {
        return (
          <div className={styles.dots_spinner}>
            {[...Array(3)].map((_, i) => (
              <span key={i} className={styles.dot} />
            ))}
          </div>
        );
      }

      const IconComponent = type === 'blue' ? IcoSpinnerBlue : IcoSpinner;
      return <IconComponent className={styles.spinner} />;
    };

    return (
      <div ref={ref} className={cn(className, 'nlp--spinner')}>
        {isLoading && (
          <>
            {renderSpinnerByType(iconType)}
            {showBackdrop && <BackDrop />}
          </>
        )}
      </div>
    );
  },
);

export const Spinner = SpinnerComponent;
