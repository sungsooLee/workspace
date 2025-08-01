import { useMutation, useQuery } from '@tanstack/react-query';
import { requestMutateOptions, requestQueryOptions } from './request-channel.queries';

export function useGetRequestChannelList(params: any) {
  return useQuery(requestQueryOptions.list(params));
}

export function useGetRequestChannelDetail(channelRequestUuid: string) {
  return useQuery(requestQueryOptions.detail(channelRequestUuid));
}

export function useApproveRequestChannel(options: any) {
  const mutation = useMutation({
    ...requestMutateOptions.approve(),
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
    ...requestMutateOptions.reject(),
    ...options,
  });
  return {
    reject: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    ...mutation,
  };
}

export function useUpdateRequestChannel(options: any) {
  const mutation = useMutation({
    ...requestMutateOptions.update(),
    ...options,
  });
  return {
    update: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    ...mutation,
  };
}
