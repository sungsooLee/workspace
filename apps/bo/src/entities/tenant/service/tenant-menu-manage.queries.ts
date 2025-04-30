import TenantMenuManageService from '../api/menu-tenant-manage';

export const queryKeys = {
  tree: ['menu-tenant-manage'] as const,
  detail: (tenantMappingMenuId: number) => [...queryKeys.tree, tenantMappingMenuId] as const,
};

export const tenantMenuManageQueryOptions = {
  //메뉴 트리 정보
  tree: (tenantId: number, menuScope: string) => ({
    queryKey: [...queryKeys.tree, tenantId, menuScope],
    queryFn: () => TenantMenuManageService.findMenuTenantMappingTree(tenantId, menuScope),
  }),
  detail: (tenantMappingMenuId: number) => ({
    queryKey: [...queryKeys.detail(tenantMappingMenuId)],
    queryFn: () => TenantMenuManageService.findMenuTenantDetail(tenantMappingMenuId),
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
};
