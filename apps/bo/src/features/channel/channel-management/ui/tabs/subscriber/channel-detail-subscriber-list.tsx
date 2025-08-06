import { useGetChannelDetail } from '@entities/channel';
import { useChannelSubscriberPage } from '@features/channel/channel-management/hooks/use-channel-subscriber-page';
import { Divider } from '@learnway/ui/elements';
import { GridBox } from '@learnway/ui/grid';
import { useRouterState } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ChannelSubscriberSearchForm } from './channel-subscriber-search-form';

interface ChannelDetailSubscriberListProps {
  onChange: (userUuid: string) => void;
}

const ChannelDetailSubscriberListComponent = ({ onChange }: ChannelDetailSubscriberListProps) => {
  const { provider, gridConfig, onSubmit, onReset, handleOnSearch, watch } =
    useChannelSubscriberPage();

  const routerState = useRouterState();
  const channelUuid = routerState.location.state?.channelUuid;

  const [channel, setChannel] = useState(null);

  const { data: channelData } = useGetChannelDetail(channelUuid);

  useEffect(() => {
    if (channelData) setChannel(channelData);
  }, [channelData]);

  return (
    <>
      <ChannelSubscriberSearchForm
        channel={channel}
        provider={provider}
        onSubmit={onSubmit}
        onSearch={handleOnSearch}
        onReset={onReset}
        watch={watch}
      />
      <Divider />
      <GridBox config={gridConfig} multiple />
    </>
  );
};

export const ChannelDetailSubscriberList = ChannelDetailSubscriberListComponent;
