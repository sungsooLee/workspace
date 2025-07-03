import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys, mutateOptions, queryOptions } from './channel.queries';

export function useGetChannelList(params: any) {
  return useQuery(queryOptions.list(params));
}

export function useGetChannelDetail(channeId: number) {
  return useQuery(queryOptions.detail(channeId));
}

export function useCreateChannel(options: any) {
  const mutation = useMutation({
    ...mutateOptions.create(),
    ...options,
  });
  return {
    create: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    ...mutation,
  };
}
