import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { mutationOptions, queryKeys, queryOptions } from './notification.queries';
import { Notification } from '../model/notification';

export function useNotifications({ userUUID }: { userUUID: string }) {
  const queryClient = useQueryClient();
  // 알림 목록 쿼리
  const { data: notifications = [], refetch: refetchNotifications } = useQuery({
    ...queryOptions.list(userUUID),
  });

  // 읽지 않은 알림 수 쿼리
  const { data: unreadCount = 0, refetch: refetchUnreadCount } = useQuery({
    ...queryOptions.unreadCount(userUUID),
  });
  const { mutate: markAsRead } = useMutation({
    ...mutationOptions.markAsRead(userUUID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list(userUUID) });
      queryClient.invalidateQueries({ queryKey: queryKeys.unreadCount(userUUID) });
    },
  });

  const { mutate: checkAll } = useMutation({
    ...mutationOptions.checkAll(userUUID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list(userUUID) });
      queryClient.invalidateQueries({ queryKey: queryKeys.unreadCount(userUUID) });
    },
  });

  return {
    notifications,
    unreadCount,
    markAsRead,
    checkAll,
    refetchNotifications,
    refetchUnreadCount,
  };
}
