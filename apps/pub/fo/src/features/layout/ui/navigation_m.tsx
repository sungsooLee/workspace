import { IcoHome03, IcoMenu01 } from '@learnway/icons';

import { Link } from '@tanstack/react-router';
import { memo } from 'react';
import { NavigationPopupM } from '../../layout';

import '@learnway/styles/fo/features/layout/m.ui/navigate-button/navigate-button.css';
import styles from '@learnway/styles/fo/features/layout/m.ui/navigate-button/navigate-button.module.css';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';

const NavigationMComponent = () => {
  // modal
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
                {/* 퍼블수정 20250731 setting 아이콘 삭제 */}
              </div>
            ),
            content: <NavigationPopupM />,
          })
        }
      >
        {/* 퍼블수정 20250731 아이콘 수정 */}
        <IcoMenu01 width={24} height={24} stroke="#131c30" fill="none" />
      </Button>
    </div>
  );
};

export const NavigationM = memo(NavigationMComponent);
