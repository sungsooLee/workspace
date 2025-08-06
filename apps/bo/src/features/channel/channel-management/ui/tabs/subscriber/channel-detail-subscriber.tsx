import { forwardRef, useEffect, useState } from 'react';
import { EnChannelDetailButtonLayout, EnChannelDetailListType } from '../../../types/type';
import { ChannelDetailSubscriberDetail } from './channel-detail-subscriber-detail';
import { ChannelDetailSubscriberList } from './channel-detail-subscriber-list';

interface ChannelDetailSubscriberProps {
  onButtonChange: (layout: EnChannelDetailButtonLayout, listType?: EnChannelDetailListType) => void;
}

const ChannelDetailSubscriberComponent = (props: ChannelDetailSubscriberProps, ref: any) => {
  const [userUuid, setUserUuid] = useState<string | null>(null);

  useEffect(() => {
    if (props.onButtonChange) {
      if (userUuid)
        props.onButtonChange(
          EnChannelDetailButtonLayout.CANCEL_SUBSCRIBE,
          EnChannelDetailListType.TAB_LIST,
        );
      else props.onButtonChange(EnChannelDetailButtonLayout.NONE);
    }
  }, [props, userUuid]);

  const handleOnUserChange = (uuid: string) => {
    setUserUuid(uuid);
  };

  const handleOnCompleted = () => {
    setUserUuid(null);
  };

  return (
    <>
      {!userUuid && <ChannelDetailSubscriberList onChange={handleOnUserChange} />}
      {userUuid && (
        <ChannelDetailSubscriberDetail
          ref={ref}
          userUuid={userUuid}
          onCompleted={handleOnCompleted}
        />
      )}
    </>
  );
};

export const ChannelDetailSubscriber = forwardRef(ChannelDetailSubscriberComponent);
