import { memo } from 'react';

import { Avatar, Popover } from '@learnway/ui';
import { IcoAlarmFill } from '@learnway/icons';
import styles from './notification.module.css';

import { useFetchAuthUser } from '../../../../entities/auth';

const PopoverContent = () => {
  return <div className={styles.alarm_content}>PopoverContent</div>;
};

const NotificationComponent = () => {
  return (
    <Popover popoverContent={<PopoverContent />}>
      {/* <Avatar imageUrl="https://*.png" fallback="Noti" /> */}
      <button type="button" className={styles.btn_alarm}>
        <IcoAlarmFill width={32} height={32} stroke="#fff" />
        <em className={styles.count_view}>99</em>
      </button>
    </Popover>
  );
};

export const Notification = memo(NotificationComponent);
