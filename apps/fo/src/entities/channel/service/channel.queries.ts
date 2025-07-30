import { UseQueryOptions } from '@tanstack/react-query';
import ChannelService from '../api/channel';

export const queryKeys = {
  channel: (uuid: string) => ['channel', uuid] as const,
};
export const queryOptions = {
  // 채널 정보 조회
  detail: (uuid: string): UseQueryOptions => ({
    queryKey: queryKeys.channel(uuid),
    queryFn: async () => ChannelService.fetch(uuid),
    enabled: !!uuid, // uuid가 있을 때만 쿼리 실행
  }),
};

export const mutateOptions = {
};
