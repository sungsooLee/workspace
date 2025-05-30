import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryOptions, mutateOptions, queryKeys } from './notification.queries';

// 알람 목록, 알람 카운트
export function useNotifications() {
  // 알림 목록 쿼리
  const { data: notifications = [], refetch: refetchNotifications } = useQuery({
    ...queryOptions.all(),
  });

  // 읽지 않은 알림 수 쿼리
  const { data: count = 0, refetch: refetchUnreadCount } = useQuery({
    ...queryOptions.count(),
  });

  return {
    notifications,
    count,
    refetchNotifications,
    refetchUnreadCount,
  };
}

// 전체 처리 훅
export function useNotificationsActionForAll() {
  const queryClient = useQueryClient();
  // 알림 목록 쿼리

  const deleteAllMutate = useMutation({
    ...mutateOptions.deleteAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.count });
    },
  });

  const readAllMutate = useMutation({
    ...mutateOptions.readAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.count });
    },
  });

  return {
    readAll: () => {
      readAllMutate.mutate();
    },
    deleteAll: () => {
      deleteAllMutate.mutate();
    },
  };
}

//단건 처리 훅
export function useNotificationsAction() {
  const queryClient = useQueryClient();

  const deleteMutate = useMutation({
    ...mutateOptions.delete(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.count });
    },
  });

  const readMutate = useMutation({
    ...mutateOptions.read(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.count });
    },
  });

  return {
    read: (payload: number) => {
      readMutate.mutate(payload);
    },
    delete: (payload: number) => {
      deleteMutate.mutate(payload);
    },
  };
}
