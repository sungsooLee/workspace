import { getQuerySkipToken, convertHierarchyNode, getRandomId } from '@learnway/shared';
import { queryOptionsForUseCache } from '@learnway/config';
import { isMobile } from 'react-device-detect';

import MenuService from '../api/menu';
import { Menu } from '../../../types';

export const menuQueryKeys = {
  all: ['menus'] as const,
  allByParentMenuId: (parentMenuId: number) => [...menuQueryKeys.all, parentMenuId] as const,
  detail: (tenantId: number, roleId: number | string) =>
    [...menuQueryKeys.all, tenantId, roleId] as const,
  menuDetail: (menuId: number) => ['menus-detail', menuId] as const,
};

export const menuQueryOptions = {
  all: (tenantId?: number, roleId?: number | string) =>
    // TODO roleId 체크 추가  && roleId
    tenantId && roleId
      ? {
          queryKey: menuQueryKeys.detail(tenantId, roleId),
          queryFn: async () => {
            const data = await MenuService.getMenus(tenantId, roleId, isMobile);

            return convertHierarchyNode(
              data?.children || [],
              (node: any, depth: number, index: number, parentNode?: any) => {
                if (parentNode) {
                  const cloneParentNode = { ...parentNode };
                  delete cloneParentNode.children;
                  node['parentNode'] = cloneParentNode;
                }
                node['depth'] = depth;

                return [node, node.children];
              },
            );
          },
          ...queryOptionsForUseCache,
        }
      : getQuerySkipToken<Menu[]>(),

  allFo: (tenantId?: number, roleId?: number) =>
    // TODO roleId 체크 추가  && roleId
    tenantId && roleId
      ? {
          queryKey: menuQueryKeys.detail(tenantId, roleId),
          queryFn: async () => {
            const data = await MenuService.getMenus(tenantId, roleId, isMobile);

            return convertHierarchyNode(
              data?.children || [],
              (node: any, depth: number, index: number, parentNode?: any) => {
                if (parentNode) {
                  const cloneParentNode = { ...parentNode };
                  delete cloneParentNode.children;
                  node['parentNode'] = cloneParentNode;
                }
                node['depth'] = depth;

                return [node, node.children];
              },
            );
          },
          ...queryOptionsForUseCache,
        }
      : getQuerySkipToken<Menu[]>(),

  detail: (menuId: number) => ({
    queryKey: menuQueryKeys.menuDetail(menuId),
    queryFn: () => MenuService.getMenu(menuId),
  }),
};
