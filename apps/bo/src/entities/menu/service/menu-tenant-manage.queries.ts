import MenuTenantManageService from '../api/menu-tenant-manage';
import MenuMangerService from '../api/menu-manage';

export const queryKeys = {
  tree: ['menu-tenant-manage'] as const,
  detail: (menuId: string) => [...queryKeys.tree, menuId] as const,
};

export const menuTenantManageQueryOptions = {
  //메뉴 트리 정보
  tree: (tenantId: string, deviceType: string) => ({
    queryKey: [...queryKeys.tree, tenantId, deviceType],
    queryFn: () => MenuTenantManageService.findMenuTenantTree(tenantId, deviceType),
  }),
  detail: (menuId: string) => ({
    queryKey: [...queryKeys.detail(menuId)],
    queryFn: () => MenuMangerService.fetchMenuDetail(menuId),
  }),
};
