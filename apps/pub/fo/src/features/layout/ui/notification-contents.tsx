import { IcoBell04 } from '@learnway/icons';
import { Button } from '@learnway/ui/button';
import { Tabs } from '@learnway/ui/tabs';
import { memo, useState } from 'react';
import styles from './notification-contents.module.css';

interface NotificationInfo {
  id: number;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  hasLink: boolean;
  category: 'a' | 'b' | 'c' | 'd' | 'archive';
}

const dummyNotifications: NotificationInfo[] = [
  {
    id: 1,
    title: '공지사항 안내',
    message: '시스템 점검 안내입니다.',
    time: '5분 전',
    isRead: false,
    hasLink: true,
    category: 'd',
  },
  {
    id: 2,
    title: '배지 획득',
    message: '프론트엔드 마스터 배지를 획득했어요!',
    time: '1시간 전',
    isRead: true,
    hasLink: false,
    category: 'c',
  },
  {
    id: 3,
    title: '강의 완료',
    message: 'React 고급 강의를 완료했어요.',
    time: '어제',
    isRead: false,
    hasLink: true,
    category: 'b',
  },
  {
    id: 4,
    title: '보관된 알림',
    message: '이 알림은 보관함에 있어요.',
    time: '3일 전',
    isRead: true,
    hasLink: false,
    category: 'archive',
  },
];

const items = [
  { title: '전체', key: 'a' },
  { title: '학습', key: 'b' },
  { title: '배지', key: 'c' },
  { title: '공지', key: 'd' },
];

const NotificationContentsComponent = () => {
  const [selectedTabKey, setSelectedTabKey] = useState<'a' | 'b' | 'c' | 'd'>('a');
  const [isArchiveView, setIsArchiveView] = useState(false);

  const handleTabChange = (key: string) => {
    setSelectedTabKey(key as 'a' | 'b' | 'c' | 'd');
    setIsArchiveView(false); // 탭 클릭 시 보관함 뷰 해제
  };

  const handleArchiveClick = () => {
    setIsArchiveView(true);
  };

  const filteredNotifications = isArchiveView
    ? dummyNotifications.filter((n) => n.category === 'archive')
    : selectedTabKey === 'a'
      ? dummyNotifications.filter((n) => n.category !== 'archive')
      : dummyNotifications.filter((n) => n.category === selectedTabKey);

  return (
    <div className={`${styles.start} ${styles.alarm_contents}`}>
      <div className={styles.header}>
        <Tabs
          selectedTabKey={selectedTabKey}
          onTabChange={handleTabChange}
          items={items}
          type="line"
          variant="gray"
        />
        <button
          onClick={handleArchiveClick}
          className={`${styles.archive_button} ${isArchiveView ? styles.active : ''}`}
        >
          보관함
        </button>
      </div>

      <div className={styles.total}>
        <strong>{filteredNotifications.length}</strong>개의 알림이 있습니다.
      </div>

      {filteredNotifications.length === 0 ? (
        <div className={styles.empty}>
          <IcoBell04 className={styles.ico_bell} />
          새로운 알림이 없습니다.
          <span className={styles.sub_text}>알림은 30일 동안 보관됩니다.</span>
        </div>
      ) : (
        <ul className={styles.info_list}>
          {filteredNotifications.map((noti) => (
            <li
              className={`${styles.info_item} ${!noti.isRead ? styles.active : ''}`}
              key={noti.id}
            >
              <div className={styles.title_wrap}>
                <strong className={styles.title}>{noti.title}</strong>
              </div>
              <div className={styles.message_wrap}>
                <p className={styles.message}>{noti.message}</p>
                <Button variant="underline" size="sm" label={'9건 더보기'} />
                <p className={styles.time}>{noti.time}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const NotificationContents = memo(NotificationContentsComponent);
