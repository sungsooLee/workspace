import { getQuerySkipToken, convertHierarchyNode, getRandomId } from '@learnway/shared';
import { isMobile } from 'react-device-detect';

import MenuService from '../api/menu';
import { Menu, Role } from '@learnway/auth/types';

export const queryKeys = {
  all: ['menus'] as const,
  allByParentMenuId: (parentMenuId: number) => [...queryKeys.all, parentMenuId] as const,
  detail: (menuId: number) => [...queryKeys.all, menuId] as const,
};

export const queryOptions = {
  all: (tenantId?: number, roles?: Role[]) =>
    tenantId && roles
      ? {
          queryKey: queryKeys.all,
          queryFn: async () => {
            // 테넌트에 종속된 역할 ID 추출
            const currentTenantRoles = roles.filter((r) => r.tenantId === tenantId);
            if (!currentTenantRoles) return [];
            const data = await MenuService.getMenus(tenantId, currentTenantRoles, isMobile);

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
