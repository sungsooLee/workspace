import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  queryKeys,
  menuTenantManageQueryOptions as queryOptions,
} from './menu-tenant-manage.queries';

export function useMenuTenantMangeFetchTrees(tenantId: string, deviceType: string) {
  return useQuery(queryOptions.tree(tenantId, deviceType));
}

export function useMenuTenantManageDetail(menuId: string) {
  return useQuery({ ...queryOptions.detail(menuId), enabled: !!menuId });
}
