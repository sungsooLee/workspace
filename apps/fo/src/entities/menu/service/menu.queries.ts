import { getQuerySkipToken, convertHierarchyNode, getRandomId } from '@learnway/shared';
import { isMobile } from 'react-device-detect';

import MenuService from '../api/menu';
import { Menu } from '@learnway/auth';

export const queryKeys = {
  all: ['menus'] as const,
  allByParentMenuId: (parentMenuId: number) => [...queryKeys.all, parentMenuId] as const,
  detail: (menuId: number) => [...queryKeys.all, menuId] as const,
};

export const queryOptions = {
  all: (tenantId?: number) =>
    tenantId //&& params?.roleIds
      ? {
          queryKey: queryKeys.all,
          queryFn: async () => {
            const data = await MenuService.getMenus(tenantId, isMobile);

            return convertHierarchyNode(
              data?.children,
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
        }
      : getQuerySkipToken<Menu[]>(),

  detail: (menuId: number) => ({
    queryKey: queryKeys.detail(menuId),
    queryFn: () => MenuService.getMenu(menuId),
  }),
};
