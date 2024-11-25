import MenuService from '../api/menu';

export const queryKeys = {
  all: ['menus'] as const,
  allByParentMenuId: (parentMenuId: string) => [...queryKeys.all, parentMenuId] as const,
  detail: (menuId: string) => [...queryKeys.all, menuId] as const,
};

export const queryOptions = {
  all: (parentMenuId?: string) => ({
    queryKey: parentMenuId ? queryKeys.allByParentMenuId(parentMenuId) : queryKeys.all,
    queryFn: () => MenuService.getMenus(parentMenuId),
  }),

  detail: (menuId: string) => ({
    queryKey: queryKeys.detail(menuId),
    queryFn: () => MenuService.getMenu(menuId),
  }),
};
