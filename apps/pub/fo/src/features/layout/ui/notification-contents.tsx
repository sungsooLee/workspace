import { IcoBell04, IcoFolder, IcoMoreHorizontal } from '@learnway/icons';
import dropdownPopoverStyles from '@learnway/styles/fo/shared/ui/dropdown-popover/dropdown-popover.module.css';
import { Badge } from '@learnway/ui/badge';
import { Button } from '@learnway/ui/button';
import { Popover } from '@learnway/ui/popover';
import { Tabs } from '@learnway/ui/tabs';
import { Link } from '@tanstack/react-router';
import { memo, useState } from 'react';

import styles from './notification-contents.module.css';

const TotalopoverCompoment = () => {
  return (
    <div className={`${dropdownPopoverStyles.start} ${dropdownPopoverStyles.dropdown_wrap}`}>
      <Button>모두 읽음 상태로 표시</Button>
      <Button>전체삭제</Button>
    </div>
  );
};

const ListopoverCompoment = () => {
  return (
    <div className={`${dropdownPopoverStyles.start} ${dropdownPopoverStyles.dropdown_wrap}`}>
      <Button>읽음 상태로 표시</Button>
      <Button>삭제</Button>
      <Button>보관{/* 보관해제 */}</Button>
    </div>
  );
};
interface NotificationInfo {
  id: number;
  title: React.ReactNode;
  message: React.ReactNode;
  time: string;
  isNew: boolean;
  isRead: boolean;
  hasLink: boolean;
  category: 'a' | 'b' | 'c' | 'd' | 'e'; // 전체(a), 학습(b), 배지(c), 공지(d), 보관함(e)
}

const dummyNotifications: NotificationInfo[] = [
  {
    id: 1,
    title: '공지사항 안내',
    message: '시스템 점검 안내입니다.',
    time: '5분 전',
    isNew: true,
    isRead: false,
    hasLink: true,
    category: 'd',
  },
  {
    id: 2,
    title: '배지 획득',
    message: '프론트엔드 마스터 배지를 획득했어요!',
    time: '1시간 전',
    isNew: false,
    isRead: true,
    hasLink: false,
    category: 'b',
  },
  {
    id: 3,
    title: (
      <Link to="/" className={styles.link}>
        서버점검
      </Link>
    ),
    message: '서버점검 시간입니다.',
    time: '어제',
    isNew: false,
    isRead: true,
    hasLink: true,
    category: 'd',
  },
  {
    id: 4,
    title: 'AI 전문가의 길은 멀고도 어렵다.',
    message: (
      <>
        <strong>프론트엔드 마스터 배지를 획득했어요!</strong> 수강신청 승인{' '}
        <Button size="md" variant={'primary'} underline={true} className={styles.link}>
          N건
        </Button>{' '}
        결재 대기중입니다.
      </>
    ),
    time: '1시간 전',
    isNew: false,
    isRead: false,
    hasLink: false,
    category: 'b',
  },
];

const categoryLabelMap: Record<NotificationInfo['category'], string> = {
  a: '전체',
  b: '학습',
  c: '배지',
  d: '공지',
  e: '보관함',
};

const NotificationContentsComponent = () => {
  const [selectedTabKey, setSelectedTabKey] = useState<NotificationInfo['category']>('a');

  const tabItems = [
    { title: '전체', key: 'a' },
    { title: '학습', key: 'b' },
    { title: '배지', key: 'c' },
    { title: '공지', key: 'd' },
    // '보관함(e)'은 탭에서 제거
  ];

  const filteredNotifications =
    selectedTabKey === 'a'
      ? dummyNotifications
      : dummyNotifications.filter((n) => n.category === selectedTabKey);

  return (
    <div className={`${styles.start} ${styles.alarm_contents}`}>
      <div className={styles.tab_header}>
        <Tabs
          selectedTabKey={selectedTabKey}
          onTabChange={(key) => setSelectedTabKey(key as NotificationInfo['category'])}
          items={tabItems}
          type="line"
          variant="gray"
        />
        <Button
          size="sm"
          variant={selectedTabKey === 'e' ? 'primary' : 'gray'}
          onClick={() => setSelectedTabKey('e')}
        >
          보관함
        </Button>
      </div>

      <div className={styles.total_box}>
        <span className={styles.total}>
          <strong>127</strong> 개의 알림이 있습니다.
        </span>

        <Popover
          popoverContent={<TotalopoverCompoment />}
          side="bottom"
          align="start"
          sideOffset={10}
        >
          <IcoMoreHorizontal className={styles.ico} />
        </Popover>
      </div>

      {filteredNotifications.length === 0 ? (
        <div className={styles.empty}>
          <IcoBell04 className={styles.ico_bell} />
          <IcoFolder className={styles.ico_bell} />
          {selectedTabKey === 'e' ? '보관함이 없습니다.' : '알림이 없습니다.'}
        </div>
      ) : (
        <ul className={styles.info_list}>
          {filteredNotifications.map((noti) => (
            <li
              className={` ${styles.info_item} ${noti.isNew ? styles.new : ''} ${noti.isRead ? styles.active : ''} `}
              key={noti.id}
            >
              <div className={styles.head}>
                <Badge
                  option={{
                    label: categoryLabelMap[noti.category],
                    value: categoryLabelMap[noti.category],
                  }}
                  status="primary"
                  rounded
                  size="sm"
                />
                <div className={styles.list_set}>
                  <span className={styles.time}>{noti.time}</span>
                  <Popover
                    popoverContent={<ListopoverCompoment />}
                    side="bottom"
                    align="start"
                    sideOffset={10}
                  >
                    <IcoMoreHorizontal className={styles.ico} />
                  </Popover>
                </div>
              </div>
              <div className={styles.message_wrap}>
                <div className={styles.title}>{noti.title}</div>
                <div className={styles.message}>{noti.message}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const NotificationContents = memo(NotificationContentsComponent);
