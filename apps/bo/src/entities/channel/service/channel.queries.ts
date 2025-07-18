import { UseQueryOptions } from '@tanstack/react-query';
import { ChannelByRoleId } from '@types';
import ChannelService from '../api/channel';

export const queryKeys = {
  all: ['channel'] as const,
  list: (params: any) => [...queryKeys.all, 'list', params] as const,
  detail: (channelUuid: string) => [...queryKeys.all, 'detail', channelUuid] as const,
  channelByRoleId: (channelId: number) => ['channel-by-role-id', channelId] as const,
};

export const queryOptions = {
  list: (params: any) => ({
    queryKey: queryKeys.list(params),
    queryFn: () => ChannelService.getChannelList(params),
  }),
  detail: (channelUuid: string) => ({
    queryKey: queryKeys.detail(channelUuid),
    queryFn: () => ChannelService.getChannelDetail(channelUuid),
  }),
  channelByRoleId: <T = ChannelByRoleId[]>(roleId: number): UseQueryOptions<T> => ({
    queryKey: queryKeys.channelByRoleId(roleId),
    queryFn: async (): Promise<T> => ChannelService.fetchChannelByRoleId(roleId),
  }),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: any) => ChannelService.createChannel(payload),
  }),
  update: () => ({
    mutationFn: (payload: any) => ChannelService.updateChannelDetail(payload),
  }),
};
