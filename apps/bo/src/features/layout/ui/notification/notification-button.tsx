import { memo } from 'react';

import { Popover, Badge, Button } from '@learnway/ui';
import { IcoAlarmFill } from '@learnway/icons';
import { useFetchAuthUser } from '@learnway/auth';
import { cn } from '@learnway/shared';

import { NotificationList } from './notification-list';

import styles from './notification-button.module.css';
import { useNotifications, useNotificationsActionForAll } from '@entities/notification';

const PopoverContent = () => {
  const { deleteAll, readAll } = useNotificationsActionForAll();
  const handleReadAll = () => {
    readAll();
  };

  const handleDeleteAll = () => {
    deleteAll();
  };

  return (
    <div className={cn(styles.start, styles.alarm_wrap)}>
      <div className={styles.alarm_content}>
        {/* alarm_header */}
        <div className={styles.alarm_header}>
          <strong className={styles.tit}>{'알림'}</strong>
          <div className={styles.btn_wrap}>
            <Button className={styles.btn} onClick={handleReadAll}>
              전체읽음
            </Button>
            <Button className={styles.btn} onClick={handleDeleteAll}>
              전체삭제
            </Button>
          </div>
        </div>
        {/* contents */}
        <NotificationList />
      </div>
    </div>
  );
};

const NotificationComponent = () => {
  const { count } = useNotifications();

  return (
    <Popover popoverContent={<PopoverContent />} side="bottom" align="end" sideOffset={5}>
      {/* <Avatar imageUrl="https://*.png" fallback="Noti" /> */}
      <span className={styles.alarm_info}>
        <IcoAlarmFill width={32} height={32} stroke="#fff" />
        <Badge
          className={styles.count_view}
          option={{ label: count + '', value: 'A' }}
          variant="number"
          status="new"
          size="sm"
        />
      </span>
    </Popover>
  );
};

export const NotificationButton = memo(NotificationComponent);
