import { memo, useMemo } from 'react';

import { Popover, Badge, Button, useModal } from '@learnway/ui';
import { IcoAlarmFill } from '@learnway/icons';
import { cn } from '@learnway/shared';

import { NotificationList } from './notification-list';

import styles from './notification-button.module.css';
import { useNotifications, useNotificationsActionForAll } from '@entities/notification';
import { t } from 'i18next';

const PopoverContent = () => {
  const { notifications } = useNotifications();
  const { deleteAll, readAll } = useNotificationsActionForAll();
  const { alert: openAlert } = useModal();

  const readAllDisabled = useMemo(() => {
    return notifications?.every((item) => item.isAlarmConfirm === true);
  }, [notifications]);
  const handleReadAll = () => {
    readAll();
  };

  const handleDeleteAll = async () => {
    await openAlert({
      isConfirm: true,
      title: t('LABEL.confirm.notificationDelete.title'),
      content: t('LABEL.confirm.notificationDelete.message'),
      onClose: (isConfirm) => {
        isConfirm && deleteAll();
      },
    });
  };

  return (
    <div className={cn(styles.start, styles.alarm_wrap)}>
      <div className={styles.alarm_content}>
        {/* alarm_header */}
        <div className={styles.alarm_header}>
          <strong className={styles.tit}>{t('LABEL.common.notification')}</strong>
          <div className={styles.btn_wrap}>
            <Button className={styles.btn} onClick={handleReadAll} disabled={readAllDisabled}>
              {t('LABEL.common.readAll')}
            </Button>
            <Button className={styles.btn} onClick={handleDeleteAll} disabled={!notifications}>
              {t('LABEL.common.deleteAll')}
            </Button>
          </div>
        </div>
        {/* contents */}
        <NotificationList notifications={notifications} />
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
        {count !== 0 && (
          <Badge
            className={styles.count_view}
            option={{ label: count + '', value: 'A' }}
            variant="number"
            status="new"
            size="sm"
          />
        )}
      </span>
    </Popover>
  );
};

export const NotificationButton = memo(NotificationComponent);
