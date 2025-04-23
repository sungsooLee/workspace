import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryOptions } from './tenant-category.queries';

export function useFetchTenantCategory(tenantId: number) {
  return useQuery(queryOptions.all(tenantId));
}

export function useFetchTenantCategoryDetail(tenantId: number, id: number) {
  return useQuery(queryOptions.detail(tenantId, id));
}
