import { getQuerySkipToken } from '@learnway/shared';

import MenuService from '../api/menu';
import { FetchMenusParams, Menu } from '../../../types/entities/menu';

export const queryKeys = {
  all: ['menus'] as const,
  allByParentMenuId: (parentMenuId: number) => [...queryKeys.all, parentMenuId] as const,
  detail: (menuId: string) => [...queryKeys.all, menuId] as const,
};

export const queryOptions = {
  all: (params?: FetchMenusParams) =>
    params?.tenantId && params?.roleIds
      ? {
          queryKey: params.parentMenuId
            ? queryKeys.allByParentMenuId(params.parentMenuId)
            : queryKeys.all,
          queryFn: async () => {
            const data = await MenuService.getMenus(params);
            return data?.children as Menu[];
          },
        }
      : getQuerySkipToken<Menu[]>(),

  detail: (menuId: string) => ({
    queryKey: queryKeys.detail(menuId),
    queryFn: () => MenuService.getMenu(menuId),
  }),
};
