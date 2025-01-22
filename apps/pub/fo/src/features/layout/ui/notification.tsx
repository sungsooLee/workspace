import { memo } from 'react';

import { Popover } from '@learnway/ui';
import { IcoAlarmFill } from '@learnway/icons';
import styles from './notification.module.css';

const PopoverContent = () => {
  return (
    <div className={styles.alarm_content}>
      <button type="button">한국어</button>
      <button type="button">English</button>
    </div>
  );
};

const NotificationComponent = () => {
  return (
    <Popover popoverContent={<PopoverContent />}>
      <span className={styles.alarm_item}>
        <IcoAlarmFill width={32} height={32} stroke="#fff" />
      </span>
    </Popover>
  );
};

export const Notification = memo(NotificationComponent);
