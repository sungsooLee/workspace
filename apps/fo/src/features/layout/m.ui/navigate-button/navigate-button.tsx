import { Link } from '@tanstack/react-router';
import { memo } from 'react';

import { IcoHome03, IcoMenu01 } from '@learnway/icons';

import { MobileNavigateModal } from './navigate-modal';

import '@learnway/styles/fo/features/layout/m.ui/navigate-button/navigate-button.css';
import styles from '@learnway/styles/fo/features/layout/m.ui/navigate-button/navigate-button.module.css';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';

const NavigateButtonComponent = () => {
  const { openModal } = useModal();
  return (
    <div className={`${styles.start} ${styles.menu}`}>
      <Button
        onClick={() =>
          openModal({
            width: 'm_full',
            headerActionNode: (
              <div className={'mobile-navigate-button--header-action'}>
                <Link to={'/'}>
                  <IcoHome03 width={24} height={24} stroke="#131c30"></IcoHome03>
                </Link>
              </div>
            ),
            content: <MobileNavigateModal />,
          })
        }
      >
        <IcoMenu01 width={24} height={24} stroke="#131c30" fill="none" />
      </Button>
    </div>
  );
};

/**
 * @description MO M_전체메뉴 팝업 NLP_FO_GNB_M_1002
 */
export const MobileNavigateButton = memo(NavigateButtonComponent);
