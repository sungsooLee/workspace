import { memo, useState } from 'react';

import { Button, Popover, Badge } from '@learnway/ui';
import { IcoAlarmFill, IcoBell03, IcoXclose } from '@learnway/icons';
import { Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';

import styles from './notification.module.css';

// import { useFetchAuthUser } from '../../../entities/authorization';

interface NotificationInfo {
  id: number;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  hasLink: boolean;
}

const initialNotifications: NotificationInfo[] = [
  {
    id: 1,
    title: '새 공지',
    message: `${'관리자'}로 부터 ${'김현대'}님에게 요청이 왔습니다.`,
    time: '10분전',
    isRead: false,
    hasLink: true,
  },
  {
    id: 2,
    title: '시스템 점검',
    message: `내일 오전 2시에 점검이 있습니다. 내일 오전 2시에 점검이 있습니다.  내일 오전 2시에 점검이 있습니다.`,
    time: '10분전',
    isRead: true,
    hasLink: false,
  },
  {
    id: 3,
    title: '시스템 점검2',
    message: '내일 오전 2시에 점검이 있습니다2.',
    time: '10분전',
    isRead: true,
    hasLink: false,
  },
  {
    id: 4,
    title: '시스템 점검3',
    message: '내일 오전 2시에 점검이 있습니다3.',
    time: '10분전',
    isRead: true,
    hasLink: false,
  },
  {
    id: 5,
    title: '시스템 점검4',
    message: '내일 오전 2시에 점검이 있습니다4.',
    time: '10분전',
    isRead: false,
    hasLink: true,
  },
  {
    id: 6,
    title: '시스템 점검5',
    message: '내일 오전 2시에 점검이 있습니다5.',
    time: '10분전',
    isRead: false,
    hasLink: true,
  },
];

const PopoverContent = () => {
  const [notifications, setNotifications] = useState<NotificationInfo[]>(initialNotifications);

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)),
    );
  };

  const handleAllRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, isRead: true })));
  };

  const handleDeleteAll = () => {
    setNotifications([]);
  };
  return (
    <div className={cn(styles.start, styles.alarm_wrap)}>
      <div className={styles.alarm_content}>
        {/* alarm_header */}
        <div className={styles.alarm_header}>
          <strong className={styles.tit}>{'알림'}</strong>
          {/* 알림 없는 경우 미노출 */}
          {notifications.length !== 0 && (
            <div className={styles.btn_wrap}>
              <Button className={styles.btn} onClick={handleAllRead}>
                전체읽음
              </Button>
              <Button className={styles.btn} onClick={handleDeleteAll}>
                전체삭제
              </Button>
            </div>
          )}
        </div>
        <div className={styles.alarm_contents}>
          {/* 알림 없는 경우 */}
          {notifications.length === 0 ? (
            <p className={styles.empty}>
              <IcoBell03 width={48} height={48} stroke="#a9afbb" className={styles.ico_bell} />
              새로운 알림이 없습니다.
              <span className={styles.sub_text}>알림은 30일 동안 보관됩니다.</span>
            </p>
          ) : (
            <ul className={styles.info_list}>
              {notifications.map(({ id, title, message, time, isRead, hasLink }) => (
                <li
                  key={id}
                  className={`${styles.info_item} ${!isRead ? styles.yet : ''}`}
                  onClick={() => markAsRead(id)}
                >
                  <div className={styles.title_wrap}>
                    <strong className={styles.title}>{title}</strong>
                    <Button
                      className={styles.btn_close}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(id);
                      }}
                    >
                      <IcoXclose width={24} height={24} stroke="#131C30" />
                    </Button>
                  </div>
                  <div className={styles.message_wrap}>
                    {hasLink ? (
                      <Link to={''} className={styles.link}>
                        {message}
                      </Link>
                    ) : (
                      <p className={styles.message}>{message}</p>
                    )}
                    <p className={styles.time}>{time}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const NotificationComponent = () => {
  // const { data } = useFetchAuthUser();

  return (
    <Popover popoverContent={<PopoverContent />} side="bottom" align="end" sideOffset={5}>
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
