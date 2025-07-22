import { EnButtonLayout } from '@pages/_layout/tenant/channel/management/detail.lazy';
import { forwardRef, useEffect, useState } from 'react';
import { ChannelDetailSubscriberDetail } from './channel-detail-subscriber-detail';
import { ChannelDetailSubscriberList } from './channel-detail-subscriber-list';

interface ChannelDetailSubscriberProps {
  onButtonLayoutChange?: (layout: EnButtonLayout) => void;
}

const ChannelDetailSubscriberComponent = (props: ChannelDetailSubscriberProps, ref: any) => {
  const [userUuid, setUserUuid] = useState<string | null>(null);

  useEffect(() => {
    if (props.onButtonLayoutChange) {
      if (userUuid) props.onButtonLayoutChange(EnButtonLayout.CANCEL_SUBSCRIBE);
      else props.onButtonLayoutChange(EnButtonLayout.NONE);
    }
  }, [props, userUuid]);

  const handleOnUserChange = (uuid: string) => {
    setUserUuid(uuid);
  };

  const handleOnUserUnsubscribe = () => {
    setUserUuid(null);
  };

  return (
    <>
      {!userUuid && <ChannelDetailSubscriberList onChange={handleOnUserChange} />}
      {userUuid && (
        <ChannelDetailSubscriberDetail
          ref={ref}
          userUuid={userUuid}
          onUnsubscribe={handleOnUserUnsubscribe}
        />
      )}
    </>
  );
};

export const ChannelDetailSubscriber = forwardRef(ChannelDetailSubscriberComponent);
