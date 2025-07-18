import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { Button, useModal } from '@learnway/ui';
import { IcoArray, IcoHome03, IcoSetting01 } from '@learnway/icons';
import { NavigationPopupM } from '../../layout';

import styles from '@learnway/styles/fo/features/layout/m.ui/navigate-button/navigate-button.module.css';
import '@learnway/styles/fo/features/layout/m.ui/navigate-button/navigate-button.css';

const NavigationMComponent = () => {
  // modal
  const { open: openModal } = useModal();

  return (
    <div className={`${styles.start} ${styles.menu}`}>
      <Button
        onClick={() =>
          openModal({
            width: 'm_full',
            headerActionNode: (
              <div className={'mobile-navigate-button--header-action'}>
                <Link to={''}>
                  <IcoHome03 width={24} height={24} stroke="#131c30"></IcoHome03>
                </Link>
                <Link to={''}>
                  <IcoSetting01 width={24} height={24} stroke="#131c30" fill="none"></IcoSetting01>
                </Link>
              </div>
            ),
            content: <NavigationPopupM />,
          })
        }
      >
        <IcoArray width={24} height={24} stroke="#131c30" fill="none" />
      </Button>
    </div>
  );
};

export const NavigationM = memo(NavigationMComponent);
