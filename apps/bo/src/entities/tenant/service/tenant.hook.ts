import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { MutateOptions } from '@tanstack/react-query';

import { queryKeys, tenantQueryOptions as queryOptions, mutateOptions } from './tenant.queries';
import { Tenant } from '../../../types/entities/tenant';

export function useFetchTenant(tenantId?: number) {
  return useQuery(queryOptions.detail(tenantId));
}

export function useCreateTenant(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.create(),
    onSuccess: async (data: any, variables, context) => {
      // 공통 메세지 처리 등...
      queryClient.invalidateQueries({ queryKey: queryKeys.list });
      console.log('aaaaaaaa');
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    create: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}
