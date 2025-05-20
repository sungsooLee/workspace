import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys, mutateOptions, queryOptions } from './request-channel.queries';

export function useGetRequstChannelList(params: any) {
  return useQuery(queryOptions.list(params));
}

export function useGetChannelDetail(channelRequestUuid: string) {
  return useQuery(queryOptions.detail(channelRequestUuid));
}

export function useApproveRequestChannel(options: any) {
  const mutation = useMutation({
    ...mutateOptions.approve(),
    ...options,
  });
  return {
    create: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    ...mutation,
  };
}
