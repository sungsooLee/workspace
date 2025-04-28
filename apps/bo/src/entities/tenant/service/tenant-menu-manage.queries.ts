import TenantMenuManageService from '../api/menu-tenant-manage';
import MenuMangerService from '../../menu/api/menu-manage';

export const queryKeys = {
  tree: ['menu-tenant-manage'] as const,
  detail: (menuId: string) => [...queryKeys.tree, menuId] as const,
};

export const tenantMenuManageQueryOptions = {
  //메뉴 트리 정보
  tree: (tenantId: number, menuScope: string) => ({
    queryKey: [...queryKeys.tree, tenantId, menuScope],
    queryFn: () => TenantMenuManageService.findMenuTenantMappingTree(tenantId, menuScope),
  }),
  detail: (menuId: string) => ({
    queryKey: [...queryKeys.detail(menuId)],
    queryFn: () => MenuMangerService.fetchMenuDetail(menuId),
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
