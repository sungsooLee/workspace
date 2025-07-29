import { mutateOptions, queryOptions } from '@entities/channel';
import { useMutation, useQuery } from '@tanstack/react-query';

// 채널 정보 조회
export function useChannelDetail(id: string) {
  return useQuery<any>(queryOptions.detail(id));
}
// 채널 구독하기
