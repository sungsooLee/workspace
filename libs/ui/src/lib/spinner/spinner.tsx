import { BackDrop } from '../backdrop/backdrop';
import { IcoSpinner, IcoSpinnerBlue } from '@learnway/icons';

import styles from './spinner.module.css';
import React, { forwardRef } from 'react';
import { cn } from '@learnway/shared';

export interface SpinnerProps {
  isLoading?: boolean;
  className?: string;
  iconType?: 'mint' | 'blue' | 'dots'; // 확장을 고려한 구조
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

      const commonClassName = cn(styles.spinner, className, 'nlp--spinner');
      const IconComponent = type === 'blue' ? IcoSpinnerBlue : IcoSpinner;
      return <IconComponent className={commonClassName} />;
    };

    return (
      <div ref={ref} className={className}>
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
