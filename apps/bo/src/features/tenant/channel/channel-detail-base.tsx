import { useRouterState } from '@tanstack/react-router';
import { ChannelDetail } from './channel-detail';

import { cn } from '@learnway/shared';
import styles from './channel-detail-base.module.css';

const ChannelDetailBaseComponent = () => {
  const routerState = useRouterState();
  const channelId = routerState.location.state?.channelId || 1;
  return (
    <div className={cn(styles.start, styles.wrap)}>
      <ChannelDetail mode="view" channelId={channelId} />
    </div>
  );
};

export const ChannelDetailBase = ChannelDetailBaseComponent;
