import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  queryKeys,
  tenantAttributeQueryOptions as queryOptions,
  // mutateOptions,
} from './tenant-attribute.queries';

export function useTenantAttributeCompany(tenantId: string) {
  return useQuery(queryOptions.all(tenantId));
}
