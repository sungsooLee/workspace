import { UseQueryOptions } from '@tanstack/react-query';
import { ChannelByRoleId, ChannelParam } from '@types';
import ChannelService from '../api/channel';

const CHANNEL_KEY = 'channel';
export const queryKeys = {
  all: [CHANNEL_KEY] as const,
  list: [CHANNEL_KEY, 'list'] as const,
  detail: (channelUuid: string) => [CHANNEL_KEY, 'detail', channelUuid] as const,
  channelByRoleId: (channelId: number) => ['channel-by-role-id', channelId] as const };

export const queryOptions = {
  list: (roleId: string, params: ChannelParam) => ({
    queryKey: queryKeys.list,
    queryFn: () => ChannelService.getChannelList(roleId, params),
    cacheTime: 0,
    staleTime: 0,
    enabled: roleId ? true : false }),
  detail: (channelUuid: string) => ({
    queryKey: queryKeys.detail(channelUuid),
    queryFn: () => ChannelService.getChannelDetail(channelUuid) }),
  channelByRoleId: <T = ChannelByRoleId[]>(roleId: number): UseQueryOptions<T> => ({
    queryKey: queryKeys.channelByRoleId(roleId),
    queryFn: async (): Promise<T> => ChannelService.fetchChannelByRoleId(roleId) }) };

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: any) => ChannelService.createChannel(payload) }),
  update: () => ({
    mutationFn: (payload: any) => ChannelService.updateChannel(payload) }) };
