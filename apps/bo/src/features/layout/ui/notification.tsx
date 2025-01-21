import { memo } from 'react';

import { Avatar, Popover } from '@learnway/ui';
import { IcoAlarmFill } from '@learnway/icons';
import styles from './notification.module.css';

import { useFetchAuthUser } from '../../../entities/user';

const PopoverContent = () => {
  return <div className={styles.alarm_content}></div>;
};

const NotificationComponent = () => {
  const { data } = useFetchAuthUser();

  return (
    <Popover popoverContent={<PopoverContent />}>
      {/* <Avatar imageUrl="https://*.png" fallback="Noti" /> */}
      <span className={styles.alarm_item}>
        <IcoAlarmFill width={32} height={32} stroke="#fff" />
        <em className={styles.count_view}>99</em>
      </span>
    </Popover>
  );
};

export const Notification = memo(NotificationComponent);
