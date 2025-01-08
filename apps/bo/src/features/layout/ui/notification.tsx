import { memo } from 'react';

import { Avatar, Popover } from '@learnway/ui';

import { useFetchAuthUser } from '../../../entities/user';

const NotificationComponent = () => {
  const { data } = useFetchAuthUser();

  return (
    <Popover popoverContent={<>Place content for the notification here.</>}>
      <Avatar imageUrl="https://*.png" fallback="Noti" />
    </Popover>
  );
};

export const Notification = memo(NotificationComponent);
