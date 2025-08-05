import { forwardRef, useEffect, useState } from 'react';
import { ChannelDetailSubscriberDetail } from './channel-detail-subscriber-detail';
import { ChannelDetailSubscriberList } from './channel-detail-subscriber-list';
import { EnChannelDetailButtonLayout } from './types/type';

interface ChannelDetailSubscriberProps {
  onButtonLayoutChange?: (layout: EnChannelDetailButtonLayout) => void;
}

const ChannelDetailSubscriberComponent = (props: ChannelDetailSubscriberProps, ref: any) => {
  const [userUuid, setUserUuid] = useState<string | null>(null);

  useEffect(() => {
    if (props.onButtonLayoutChange) {
      if (userUuid) props.onButtonLayoutChange(EnChannelDetailButtonLayout.CANCEL_SUBSCRIBE);
      else props.onButtonLayoutChange(EnChannelDetailButtonLayout.NONE);
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
