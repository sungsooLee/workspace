import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { MutateOptions, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

import {
  tenantQueryKeys,
  tenantQueryOptions as queryOptions,
  tenantMutateOptions } from './tenant.queries';
import { PaginationResponse, Tenant, TenantByRoleId } from '@types';

export function useFetchTenant(tenantId?: number) {
  return useQuery(queryOptions.detail(tenantId));
}

/**
 * 테넌트 목록 조회 ( 역할 기준 )
 * @param roleId - 역할
 * @param options - 추가 쿼리 옵션.
 */
export const useFetchTenantByRoleId = <T = TenantByRoleId[]>(
  roleId: number,
  options?: UseQueryOptions<T, Error>,
): UseQueryResult<T, Error> => {
  return useQuery({ ...queryOptions.tenantByRoleId<T>(roleId), ...options, staleTime: Infinity });
};

export function useCreateTenant(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...tenantMutateOptions.create(),
    onSuccess: async (data: any, variables, context) => {
      // 공통 메세지 처리 등...
      queryClient.invalidateQueries({ queryKey: tenantQueryKeys.list });
      console.log('aaaaaaaa');
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options });

  return {
    create: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data };
}

export function useUpdateTenant(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...tenantMutateOptions.update(),
    onSuccess: async (data: any, variables, context) => {
      // 공통 메세지 처리 등...
      queryClient.invalidateQueries({ queryKey: tenantQueryKeys.list });
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options });

  return {
    update: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data };
}
