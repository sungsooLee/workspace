import { memo, useState } from 'react';
import { ModalBody, ModalContainer, ModalTitle, Button, Popover } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { Link } from '@tanstack/react-router';
import { IcoBell03, IcoXclose, IcoSetting01 } from '@learnway/icons';

import styles from './notification-popup-m.module.css';

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

const NotificationPopupMComponent = () => {
  const [notifications, setNotifications] = useState<NotificationInfo[]>(initialNotifications);

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)),
    );
  };

  return (
    <ModalContainer>
      <ModalTitle>
        <div className={styles.alarm_header}>
          {'알림'}
          <Popover
            className={styles.btn_setting}
            popoverContent={<PopoverAlarmState />}
            side="bottom"
            align="center"
            sideOffset={5}
          >
            <IcoSetting01 width={24} height={24} stroke="#131c30" fill="none"></IcoSetting01>
          </Popover>
        </div>
      </ModalTitle>
      <ModalBody>
        <div className={cn(styles.start, styles.alarm_wrap)}>
          <div className={styles.alarm_content}>
            <div className={styles.alarm_contents}>
              {notifications.length === 0 ? (
                // 알림 없는 경우
                <p className={styles.empty}>
                  <IcoBell03 width={48} height={48} stroke="#a9afbb" className={styles.ico_bell} />
                  새로운 알림이 없습니다.
                  <span className={styles.sub_text}>알림은 30일 동안 보관됩니다.</span>
                </p>
              ) : (
                // 알림 있는 경우
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
      </ModalBody>
    </ModalContainer>
  );
};

// popover
const PopoverAlarmState = () => {
  return (
    <div className={styles.alarm_state}>
      <Button>전체읽음</Button>
      <Button>전체삭제</Button>
    </div>
  );
};

export const NotificationPopupM = memo(NotificationPopupMComponent);
