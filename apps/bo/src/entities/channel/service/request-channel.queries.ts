import RequestChannelService from '../api/request-channel';

export const requestQueryKeys = {
  all: ['channel'] as const,
  list: (params: any) => [...requestQueryKeys.all, 'list', params] as const,
  detail: (channelRequestUuid: string) =>
    [...requestQueryKeys.all, 'detail', channelRequestUuid] as const,
};

export const requestQueryOptions = {
  list: (params: any) => ({
    queryKey: requestQueryKeys.list(params),
    queryFn: () => RequestChannelService.getRequsetChannelList(params),
  }),
  detail: (channelRequestUuid: string) => ({
    queryKey: requestQueryKeys.detail(channelRequestUuid),
    queryFn: () => RequestChannelService.getRequestChannelDetail(channelRequestUuid),
  }),
};

export const requestMutateOptions = {
  reject: () => ({
    mutationFn: (payload: any) => RequestChannelService.postApprovalRejected(payload),
  }),
  approve: () => ({
    mutationFn: (payload: any) => RequestChannelService.postApprovalApproved(payload),
  }),
  update: () => ({
    mutationFn: (payload: any) => RequestChannelService.putRequestChannel(payload),
  }),
};
