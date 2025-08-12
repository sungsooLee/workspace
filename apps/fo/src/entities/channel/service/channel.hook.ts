import { mutateOptions, queryOptions } from '@entities/channel';
import { useMutation, useQuery } from '@tanstack/react-query';

// 채널 정보 조회
export function useChannelDetail(id: string) {
  return useQuery<any>(queryOptions.detail(id));
}

// 채널 구독하기
export function useChannelSubscription(options?: any) {
  const mutation = useMutation({
    ...mutateOptions.subscription(),
    ...options,
  });
  return {
    channelSubscription: (payload: any, callback?: any) => {
      return mutation.mutateAsync(payload, callback);
    },
    ...mutation,
  };
}

// 채널 구독 취소하기
export function useChannelUnsubscription(option?: any) {
  const mutation = useMutation({
    ...mutateOptions.unsubscription(),
    ...option,
  });
  return {
    channelUnsubscription: (payload: any, callback?: any) => {
      return mutation.mutateAsync(payload, callback);
    },
    ...mutation,
  };
}
