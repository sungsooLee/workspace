import { memo } from 'react';
import { Link } from '@tanstack/react-router';

import { NotificationPopupM } from '../../layout';
import { IcoBell02 } from '@learnway/icons';

import styles from '@learnway/styles/fo/features/layout/ui/notification-m.module.css';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';

const NotificationMComponent = () => {
  const { openModal } = useModal();

  return (
    <div className={`${styles.start} ${styles.alarm_info}`}>
      <Button
        onClick={() =>
          openModal({
            width: 'm_full',
            content: <NotificationPopupM />,
          })
        }
      >
        <span className={styles.alarm_info}>
          <IcoBell02 width={24} height={24} stroke="#131C30" />
          <em className={styles.noti}></em>
        </span>
      </Button>
      {/* <p className={styles.text}>새로운 알림이 왔어요.</p> */}
    </div>
  );
};

export const NotificationM = memo(NotificationMComponent);
