import { memo } from 'react';

import { Popover, Badge } from '@learnway/ui';
import { IcoAlarmFill } from '@learnway/icons';
import { useFetchAuthUser } from '@learnway/config';

import styles from './notification.module.css';

const PopoverContent = () => {
  return <div className={styles.alarm_content}></div>;
};

const NotificationComponent = () => {
  const { data } = useFetchAuthUser();

  return (
    <Popover popoverContent={<PopoverContent />} side="bottom" align="end" sideOffset={5}>
      {/* <Avatar imageUrl="https://*.png" fallback="Noti" /> */}
      <span className={styles.alarm_info}>
        <IcoAlarmFill width={32} height={32} stroke="#fff" />
        <Badge
          className={styles.count_view}
          option={{ label: '99', value: 'A' }}
          variant="number"
          status="new"
          size="sm"
        />
      </span>
    </Popover>
  );
};

export const Notification = memo(NotificationComponent);
