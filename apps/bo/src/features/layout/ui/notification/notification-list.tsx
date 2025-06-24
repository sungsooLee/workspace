import { Link } from '@tanstack/react-router';

import { Button, Popover } from '@learnway/ui';
import { IcoBell03, IcoXclose } from '@learnway/icons';
import { cn, DATE_TIME_FORMAT } from '@learnway/shared';

import styles from './notification.module.css';
import { useNotificationsAction } from '@entities/notification';
import { formatTimeAgo } from '@learnway/shared';
import { Notification } from '@types';
import { t } from 'i18next';

const NotificationComponent = ({ notifications }: { notifications: Notification[] }) => {
  const { read, delete: deleteNotification } = useNotificationsAction();

  const handleDelete = (alarmId: number) => {
    deleteNotification(alarmId);
  };

  const handleRead = (alarmId: number) => {
    read(alarmId);
  };

  return (
    <div className={`${styles.start} ${styles.alarm_contents}`}>
      {/* 알림 없는 경우 */}
      {notifications.length === 0 ? (
        <p className={styles.empty}>
          <IcoBell03 width={48} height={48} stroke="#a9afbb" className={styles.ico_bell} />
          {t('LABEL.message.notificationEmpty')}
          <span className={styles.sub_text}>{t('LABEL.message.notificationSaveDay')}</span>
        </p>
      ) : (
        <ul className={styles.info_list}>
          {notifications.map(
            (
              {
                alarmId,
                alarmDetail,
                alarmLink,
                alarmSummary,
                createdDate,
                userId,
                isAlarmConfirm,
              },
              i,
            ) => (
              <li
                key={`${alarmId}_${i}`}
                className={cn(
                  `${styles.info_item} ${isAlarmConfirm ? '' : styles.yet}`,
                  'cursor-pointer',
                )}
                onClick={() => handleRead(alarmId)}
              >
                <div className={styles.title_wrap}>
                  <strong className={styles.title}>{alarmSummary}</strong>
                  <Button
                    className={styles.btn_close}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(alarmId);
                    }}
                  >
                    <IcoXclose width={24} height={24} stroke="#131C30" />
                  </Button>
                </div>
                <div className={styles.message_wrap}>
                  {alarmLink ? (
                    <Popover.Close asChild>
                      <Link to={alarmLink} className={styles.link}>
                        {alarmDetail}
                      </Link>
                    </Popover.Close>
                  ) : (
                    <p className={styles.message}>{alarmDetail}</p>
                  )}
                  <p className={styles.time}>
                    {formatTimeAgo(createdDate, DATE_TIME_FORMAT.MONTH_DAY)}
                  </p>
                  {/* TEST */}
                  {/* <p className={styles.time}>{createdDate}</p> */}
                </div>
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
};

export const NotificationList = NotificationComponent;
