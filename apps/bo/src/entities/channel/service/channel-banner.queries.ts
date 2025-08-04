import ChannelBannerService from '../api/channel-banner';

export const channelBannerQueryKeys = {
  all: ['channel-banner'] as const,
  list: (params: any) => [...channelBannerQueryKeys.all, 'list', params] as const,
  detail: (params: any) => [...channelBannerQueryKeys.all, 'detail', params] as const,
};

export const channelBannerQueryOptions = {
  list: (params: any) => ({
    queryKey: channelBannerQueryKeys.list(params),
    queryFn: () => ChannelBannerService.getChannelBannerList(params),
  }),
  detail: (params: any) => ({
    queryKey: channelBannerQueryKeys.detail(params),
    queryFn: () => ChannelBannerService.getChannelBanner(params),
  }),
};

export const channelBannerMutateOptions = {
  toggleDisplay: () => ({
    mutationFn: (params: any) => ChannelBannerService.putChannelBannerDisplayToggle(params),
  }),
  dnd: () => ({
    mutationFn: (payload: any) => ChannelBannerService.putChannelBannerDnd(payload),
  }),
  create: () => ({
    mutationFn: (payload: any) => ChannelBannerService.postChannelBanner(payload),
  }),
  update: () => ({
    mutationFn: (payload: any) => ChannelBannerService.putChannelBanner(payload),
  }),
  delete: () => ({
    mutationFn: (payload: any) => ChannelBannerService.deleteChannelBannerList(payload),
  }),
};
