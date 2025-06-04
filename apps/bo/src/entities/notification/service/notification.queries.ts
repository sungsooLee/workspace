import NotificationService from '../api/notification';

export const queryKeys = {
  all: ['notifications'] as const,
  count: ['notifications-count'] as const,
  // unreadCount: (userUUID: string) => [...queryKeys.all, 'unread', userUUID] as const,
};

export const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: () => NotificationService.fetchNotification(),
    staleTime: 0,
  }),
  count: () => ({
    queryKey: queryKeys.count,
    queryFn: () => NotificationService.fetchNotificationCount(),
    select: (data: number | undefined) => {
      if (data) {
        if (data > 99) return 99;
        return data;
      } else {
        return 0;
      }
    },
    staleTime: 0,
  }),
};

export const mutateOptions = {
  readAll: () => ({
    mutationFn: () => NotificationService.readAllNotification(),
  }),
  read: () => ({
    mutationFn: (payload: number) => NotificationService.readNotification(payload),
  }),
  deleteAll: () => ({
    mutationFn: () => NotificationService.deleteAllNotification(),
  }),
  delete: () => ({
    mutationFn: (payload: number) => NotificationService.deleteNotification(payload),
  }),
};
