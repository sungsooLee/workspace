import { memo } from 'react';
import { Button, useModal } from '@learnway/ui';
import { IcoArray } from '@learnway/icons';
import { NavigationPopupM } from '../../layout';

import styles from '@learnway/styles/fo/features/layout/ui/navigation_m.module.css';

const NavigationMComponent = () => {
  // modal
  const { open: openModal } = useModal();

  return (
    <div className={`${styles.start} ${styles.menu}`}>
      <Button
        onClick={() =>
          openModal({
            width: 'm_full',
            content: <NavigationPopupM />,
          })
        }>
        <IcoArray width={24} height={24} stroke="#131c30" fill="none" />
      </Button>
    </div>
  );
};

export const NavigationM = memo(NavigationMComponent);
