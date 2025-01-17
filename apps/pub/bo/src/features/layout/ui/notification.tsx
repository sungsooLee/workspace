import { memo } from 'react';

import { Avatar, Popover } from '@learnway/ui';

const NotificationComponent = () => {
  return (
    <Popover popoverContent={<>Place content for the notification here.</>}>
      <Avatar imageUrl="https://*.png" fallback="Noti" />
    </Popover>
  );
};

export const Notification = memo(NotificationComponent);
