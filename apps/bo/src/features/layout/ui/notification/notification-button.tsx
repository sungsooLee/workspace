import { memo } from 'react';

import { Popover, Badge, Button } from '@learnway/ui';
import { IcoAlarmFill } from '@learnway/icons';
import { useFetchAuthUser } from '@learnway/auth';
import { cn } from '@learnway/shared';

import { Notification } from './notification';

import styles from './notification-button.module.css';

const PopoverContent = () => {
  return (
    <div className={cn(styles.start, styles.alarm_wrap)}>
      <div className={styles.alarm_content}>
        {/* alarm_header */}
        <div className={styles.alarm_header}>
          <strong className={styles.tit}>{'알림'}</strong>
          <div className={styles.btn_wrap}>
            <Button className={styles.btn}>전체읽음</Button>
            <Button className={styles.btn}>전체삭제</Button>
          </div>
        </div>

        {/* contents */}
        <Notification />
      </div>
    </div>
  );
};

const NotificationComponent = () => {
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

export const NotificationButton = memo(NotificationComponent);
