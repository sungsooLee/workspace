import { memo, useEffect, useState } from 'react';

import { Avatar, Popover } from '@learnway/ui';
import { IcoBell02 } from '@learnway/icons';

import { useFetchAuthUser } from '../../../entities/user';

import styles from './notification.module.css';
import { PMSApiPrefix } from '../../../../../../libs/config/src';
import { useNotifications } from '../../../entities/notification/service/notification.hook';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../../entities/notification/service/notification.queries';

const PopoverContent = () => {
  return <div className={styles.alarm_content}></div>;
};

const NotificationComponent = ({ userUUID }: any) => {
  const { data } = useFetchAuthUser();
  const queryClient = useQueryClient();
  const [isConnected, setIsConnected] = useState(false);

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
    // 초기 연결 시도
    connectSSE();

    return () => {
      if (eventSource) {
        eventSource.close();
        fetch(`${PMSApiPrefix}/alarm/close/${userUUID}`);
      }
    };
  }, [userUUID, queryClient]);
  return (
    <Popover popoverContent={<PopoverContent />}>
      <button type="button" className={styles.btn_alarm}>
        <IcoBell02 width={20} height={20} stroke="#131C30" />
        {unreadCount > 0 && <em className={styles.noti}>{unreadCount}</em>}
      </button>
    </Popover>
  );
};

export const Notification = memo(NotificationComponent);
