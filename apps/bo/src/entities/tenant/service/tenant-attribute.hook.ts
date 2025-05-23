import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  queryKeys,
  tenantAttributeQueryOptions as queryOptions,
  mutateOptions,
} from './tenant-attribute.queries';

export function useTenantAttributeCompany(tenantId: number) {
  return useQuery(queryOptions.all(tenantId));
}

export function useUpdateTenantAttributeCompany(tenantId: number, options: any) {
  const mutation = useMutation({
    ...mutateOptions.update(),
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
