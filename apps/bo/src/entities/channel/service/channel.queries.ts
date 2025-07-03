import ChannelService from '../api/channel';

export const queryKeys = {
  all: ['channel'] as const,
  list: (params: any) => [...queryKeys.all, 'list', params] as const,
  detail: (channelId: number) => [...queryKeys.all, 'detail', channelId] as const,
};

export const queryOptions = {
  list: (params: any) => ({
    queryKey: queryKeys.list(params),
    queryFn: () => ChannelService.getChannelList(params),
  }),
  detail: (channeId: number) => ({
    queryKey: queryKeys.detail(channeId),
    queryFn: () => ChannelService.getChannelDetail(channeId),
  }),
};

export const mutateOptions = {
  create: () => (payload: any) => ChannelService.createChannel(payload),
  update: () => ({
    mutationFn: ({ channelId, body }: { channelId: number; body: any }) =>
      ChannelService.updateChannelDetail(channelId, body),
  }),
};
