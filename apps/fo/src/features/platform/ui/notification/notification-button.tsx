import { memo, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { isMobile } from 'react-device-detect';

import { Popover, Button, useModal } from '@learnway/ui';
import { IcoBell02, IcoArray } from '@learnway/icons';
import { PMSApiPrefix } from '@learnway/config';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { cn } from '@learnway/shared';

import { useNotifications } from '../../../../entities/notification/service/notification.hook';
import { queryKeys } from '../../../../entities/notification/service/notification.queries';

import { NotificationModal } from './notification-modal';
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

const NotificationComponent = ({ userUUID }: any) => {
  const { data } = useFetchAuthUser();
  const queryClient = useQueryClient();
  const [isConnected, setIsConnected] = useState(false);

  const { open: openModal } = useModal();

  const { notifications, unreadCount, markAsRead, checkAll } = useNotifications({ userUUID });

  useEffect(() => {
    let eventSource: EventSource | null = null;

    const connectSSE = () => {
      // SSE 연결 설정
      eventSource = new EventSource(`/pms-module/api/v1/alarm/subscribe/${userUUID}`);

      // 연결 성공
      eventSource.onopen = () => {
        setIsConnected(true);
        console.log('SSE 연결 성공');
      };

      eventSource.onerror = (error) => {
        console.log('SSE 연결 에러: ', error);
        setIsConnected(false);
        if (eventSource) eventSource.close();
        setTimeout(connectSSE, 100000);
      };

      eventSource.addEventListener('connect', (event) => {
        console.log('Connect 이벤트:', event.data);
      });

      eventSource.onmessage = (event) => {
        console.log('메세지 도착', event.data);
        try {
          const data = JSON.parse(event.data);
          queryClient.invalidateQueries({ queryKey: queryKeys.unreadCount(userUUID) });
        } catch (error) {
          console.error('메시지 파싱 에러' + error);
        }
      };

      eventSource.addEventListener('notice', (event) => {
        console.log('notice 이벤트', event.data);
        queryClient.invalidateQueries({ queryKey: queryKeys.unreadCount(userUUID) });
      });
    };
    // 초기 연결 시도 SSE 연결 구현 완료 되면 추가 예정.
    // connectSSE();

    return () => {
      if (eventSource) {
        eventSource.close();
        fetch(`${PMSApiPrefix}/alarm/close/${userUUID}`);
      }
    };
  }, [userUUID, queryClient]);

  if (isMobile) {
    return (
      <div className={`${styles.start} ${styles.alarm_info}`}>
        <Button
          onClick={() =>
            openModal({
              width: 'm_full',
              content: <NotificationModal />,
            })
          }
        >
          <span className={styles.alarm_info}>
            <IcoBell02 width={24} height={24} stroke="#131C30" />
            <em className={styles.noti}></em>
          </span>
        </Button>
        {/* <p className={styles.text}>새로운 알림이 왔어요.</p> */}
      </div>
    );
  }

  return (
    <div className={styles.alarm_info}>
      <Popover popoverContent={<PopoverContent />} side="bottom" align="end" sideOffset={5}>
        <span className={styles.alarm_info22}>
          <IcoBell02 width={20} height={20} stroke="#131C30" />
          <em className={styles.noti}></em>
        </span>
      </Popover>
      {/* <p className={styles.text}>새로운 알림이 왔어요.</p> */}
    </div>
  );
};

export const NotificationButton = memo(NotificationComponent);
