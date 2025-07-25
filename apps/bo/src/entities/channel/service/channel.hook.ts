import { useMutation, useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { ChannelByRoleId, ChannelParam } from '@types';
import { mutateOptions, queryOptions } from './channel.queries';

export function useGetChannelList(roleId: string, params: ChannelParam) {
  return useQuery(queryOptions.list(roleId, params));
}

export function useGetChannelDetail(channelUuid: string) {
  return useQuery(queryOptions.detail(channelUuid));
}

export function useUpdateChannel(options: any) {
  const mutation = useMutation({
    ...mutateOptions.update(),
    onSuccess: async (data: any, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    update: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

/**
 * 테넌트 목록 조회 ( 역할 기준 )
 * @param roleId - 역할
 * @param options - 추가 쿼리 옵션.
 */
export const useFetchChannelByRoleId = <T = ChannelByRoleId[]>(
  roleId: number,
  options?: UseQueryOptions<T, Error>,
): UseQueryResult<T, Error> => {
  return useQuery({ ...queryOptions.channelByRoleId<T>(roleId), ...options, staleTime: Infinity });
};

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
