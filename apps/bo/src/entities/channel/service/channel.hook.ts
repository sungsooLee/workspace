import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { queryKeys, mutateOptions, queryOptions } from './channel.queries';
import { ChannelByRoleId, PaginationResponse } from '@types';

export function useGetChannelList(params: any) {
  return useQuery(queryOptions.list(params));
}

export function useGetChannelDetail(channeId: number) {
  return useQuery(queryOptions.detail(channeId));
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
  return useQuery({ ...queryOptions.channelByRoleId<T>(roleId), ...options });
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
