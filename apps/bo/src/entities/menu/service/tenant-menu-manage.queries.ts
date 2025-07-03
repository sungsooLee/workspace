import TenantMenuManageService from '../api/menu-tenant-manage';
import { getQuerySkipToken } from '@learnway/shared';

export const queryKeys = {
  tree: ['menu-tenant-manage'] as const,
  detail: (tenantMappingMenuId: number) => [...queryKeys.tree, tenantMappingMenuId] as const,
};

export const tenantMenuManageQueryOptions = {
  //메뉴 트리 정보
  tree: (tenantId: number, menuScope: string) => ({
    queryKey: [...queryKeys.tree, tenantId, menuScope],
    queryFn: () =>
      tenantId
        ? TenantMenuManageService.findMenuTenantMappingTree(tenantId, menuScope)
        : getQuerySkipToken(),
  }),
  detail: (tenantMappingMenuId: number) => ({
    queryKey: [...queryKeys.detail(tenantMappingMenuId)],
    queryFn: () =>
      tenantMappingMenuId
        ? TenantMenuManageService.findMenuTenantDetail(tenantMappingMenuId)
        : getQuerySkipToken(),
  }),
};

export const mutateOptions = {
  updateMenuTenent: () => ({
    mutationFn: (payload: any) => TenantMenuManageService.updateMenuTenant(payload),
  }),
  deleteMenuTenent: () => ({
    mutationFn: (payload: any) => TenantMenuManageService.deleteMenuTenant(payload),
  }),
  createMenuTenent: () => ({
    mutationFn: (payload: any) => TenantMenuManageService.createMenuTenant(payload),
  }),
  changeMenuTenentDnd: () => ({
    mutationFn: (payload: any) => TenantMenuManageService.changeMenuTenantDnd(payload),
  }),
};
