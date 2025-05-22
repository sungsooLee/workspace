import RequestChannelService from '../api/request-channel';

export const queryKeys = {
  all: ['channel'] as const,
  list: (params: any) => [...queryKeys.all, 'list', params] as const,
  detail: (channelRequestUuid: string) => [...queryKeys.all, 'detail', channelRequestUuid] as const,
};

export const queryOptions = {
  list: (params: any) => ({
    queryKey: queryKeys.list(params),
    queryFn: () => RequestChannelService.getRequsetChannelList(params),
  }),
  detail: (channelRequestUuid: string) => ({
    queryKey: queryKeys.detail(channelRequestUuid),
    queryFn: () => RequestChannelService.getRequestChannelDetail(channelRequestUuid),
  }),
};

export const mutateOptions = {
  reject: () => (payload: any) => RequestChannelService.postApprovalRejected(payload),
  approve: () => ({
    mutationFn: (payload: any) => RequestChannelService.postApprovalApproved(payload),
  }),
};
