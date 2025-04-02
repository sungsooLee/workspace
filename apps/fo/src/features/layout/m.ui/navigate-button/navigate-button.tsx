import { memo } from 'react';
import { MobileView, BrowserView } from 'react-device-detect';

import { Button, useModal } from '@learnway/ui';
import { IcoArray } from '@learnway/icons';

import { MobileNavigateModal } from './navigate-modal';

import styles from '@learnway/styles/fo/features/layout/m.ui/navigate-button/navigate-button.module.css';

const NavigateButtonComponent = () => {
  const { open: openModal } = useModal();
  return (
    <div className={`${styles.start} ${styles.menu}`}>
      <Button
        onClick={() =>
          openModal({
            width: 'm_full',
            content: <MobileNavigateModal />,
          })
        }>
        <IcoArray width={24} height={24} stroke="#131c30" fill="none" />
      </Button>
    </div>
  );
};

export const MobileNavigateButton = memo(NavigateButtonComponent);
