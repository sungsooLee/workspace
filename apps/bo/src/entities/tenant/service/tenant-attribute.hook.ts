import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  tenantAttributeQueryKeys,
  tenantAttributeQueryOptions as queryOptions,
  tenantAttributeMutateOptions,
} from './tenant-attribute.queries';

export function useTenantAttributeCompany(tenantId?: number) {
  return useQuery(queryOptions.all(tenantId));
}

export function useUpdateTenantAttributeCompany(tenantId: number, options: any) {
  const mutation = useMutation({
    ...tenantAttributeMutateOptions.update(),
    ...options,
  });

  return {
    update: (payload: any, callback?: any) => {
      mutation.mutate({ tenantId: tenantId, body: payload } as any, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}
