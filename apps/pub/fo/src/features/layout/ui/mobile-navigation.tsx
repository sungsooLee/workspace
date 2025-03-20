import { memo } from 'react';
import { Button } from '@learnway/ui';
import { IcoArray } from '@learnway/icons';

import styles from '@learnway/styles/fo/features/layout/ui/mobile-navigation.module.css';

const MobileNavigationComponent = () => {
  return (
    <div className={`${styles.start} ${styles.menu}`}>
      <Button>
        <IcoArray width={24} height={24} stroke="#131c30" fill="none" />
      </Button>
    </div>
  );
};

export const MobileNavigation = memo(MobileNavigationComponent);
