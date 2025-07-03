import NotificationService from '../api/notification';

export const queryKeys = {
  all: ['notifications'] as const,
  list: (userUUID: string) => [...queryKeys.all, userUUID] as const,
  unreadCount: (userUUID: string) => [...queryKeys.all, 'unread', userUUID] as const,
};

export const queryOptions = {
  list: (userUUID: string) => ({
    queryKey: queryKeys.list(userUUID),
    queryFn: () => NotificationService.getNotifications(userUUID),
    staleTime: 0,
  }),
  unreadCount: (userUUID: string) => ({
    queryKey: queryKeys.unreadCount(userUUID),
    queryFn: () => NotificationService.getUncheckCount(userUUID),
    staleTime: 0,
  }),
};

export const mutationOptions = {
  markAsRead: (userUUID: string) => ({
    mutationFn: ({ alarmId }: { alarmId: number }) =>
      NotificationService.markAsRead(userUUID, alarmId),
  }),
  checkAll: (userUUID: string) => ({
    mutationFn: () => NotificationService.checkAllNotifications(userUUID),
  }),
};
