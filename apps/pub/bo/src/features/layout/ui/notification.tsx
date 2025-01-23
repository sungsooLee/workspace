import { memo } from 'react';

import { Popover } from '@learnway/ui';
import { IcoAlarmFill } from '@learnway/icons';
import styles from './notification.module.css';

// import { useFetchAuthUser } from '../../../entities/user';

const PopoverContent = () => {
  return (
    <div className={styles.alarm_content}>
      <p>111</p>
    </div>
  );
};

const NotificationComponent = () => {
  // const { data } = useFetchAuthUser();

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
