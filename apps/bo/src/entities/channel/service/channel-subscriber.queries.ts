import ChannelSubscriberService from '../api/channel-subscriber';

export const channelSubscriberQueryKeys = {
  all: ['channel-subscriber'] as const,
  list: (params: any) => [...channelSubscriberQueryKeys.all, 'list', params] as const,
};

export const channelSubscriberQueryOptions = {
  list: (params: any) => ({
    queryKey: channelSubscriberQueryKeys.list(params),
    queryFn: () => ChannelSubscriberService.getChannelSubscriptions(params),
  }),
};
