import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys, mutateOptions, queryOptions } from './request-channel.queries';

export function useGetRequestChannelList(params: any) {
  return useQuery(queryOptions.list(params));
}

export function useGetRequestChannelDetail(channelRequestUuid: string) {
  return useQuery(queryOptions.detail(channelRequestUuid));
}

export function useApproveRequestChannel(options: any) {
  const mutation = useMutation({
    ...mutateOptions.approve(),
    ...options,
  });
  return {
    approve: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    ...mutation,
  };
}

export function useRejectRequestChannel(options: any) {
  const mutation = useMutation({
    ...mutateOptions.reject(),
    ...options,
  });
  return {
    reject: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    ...mutation,
  };
}
