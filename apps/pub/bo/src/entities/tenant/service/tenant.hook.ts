import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { MutateOptions } from '@tanstack/react-query';

import { queryKeys, queryOptions, mutateOptions } from './tenant.queries';
import { Tenant } from '../../../types/entities/tenant';

export function useFetchTenant(tenantId?: number) {
  return useQuery(queryOptions.detail(tenantId));
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
