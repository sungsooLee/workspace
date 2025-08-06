import type { MutateOptions } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Tenant } from '../model/tenant.types';
import { mutateOptions, queryKeys, tenantQueryOptions } from './tenant.queries';

export function useFetchTenant(tenantId?: number) {
  return useQuery(tenantQueryOptions.detail(tenantId));
}

export function useFetchTenantByUser(accountId?: number) {
  return useQuery(tenantQueryOptions.byUser(accountId));
}

export function useCreateTenant(mutationOptions = {}) {
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError } = useMutation({
    ...mutateOptions.create(),
    onSuccess: async (data: any, variables, context) => {
      // 공통 메세지 처리 등...

      queryClient.invalidateQueries({ queryKey: queryKeys.all });
    },
    ...mutationOptions,
  });

  return {
    create: (payload: Tenant, callback?: MutateOptions<unknown, unknown, Tenant>) => {
      mutate(payload, callback);
    },
    isSuccess,
    isError,
  };
}
