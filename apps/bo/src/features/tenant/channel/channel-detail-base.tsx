import { useRouterState, useRouter } from '@tanstack/react-router';
import { ChannelDetail } from './channel-detail';
import { FormSubTitle } from '@shared/ui';
import { Button } from '@learnway/ui';

import { cn } from '@learnway/shared';
import styles from './channel-detail-base.module.css';

const ChannelDetailBaseComponent = () => {
  const router = useRouter();
  const routerState = useRouterState();
  const channelId = routerState.location.state?.channelId || 1;
  return (
    <div className={cn(styles.start, styles.wrap)}>
      <FormSubTitle
        label={'채널 정보'}
        actionNode={
          <>
            <Button
              variant={'gray2'}
              size={'sm'}
              label={'목록'}
              onClick={() => router.navigate({ to: '/tenant/channel' })}
            />
            <Button variant={'gray2'} size={'sm'} label={'초기화'} />
            <Button variant={'line'} size={'sm'} label={'저장'} />
          </>
        }
      />
      <ChannelDetail mode="view" channelId={channelId} />
    </div>
  );
};

export const ChannelDetailBase = ChannelDetailBaseComponent;
