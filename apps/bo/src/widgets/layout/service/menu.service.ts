import { useEffect } from 'react';
import { useCreation } from 'ahooks';
import { useRouterState } from '@tanstack/react-router';

import { convertHierarchyToList } from '@learnway/shared';

import { useFetchMenus } from '../../../entities/menu';
import { useFetchAuthUser } from '../../../entities/user';
import { MenuHierarchy, Menu } from '../../../types';

import { useActiveMenuState } from '../../../features/layout';

export function useMenuHierarchy(isQuickAccessArea = false) {
  const { data: authUser } = useFetchAuthUser();
  const { data } = useFetchMenus({
    parentMenuId: 1,
    tenantId: authUser?.activeTenantId,
    roleIds: authUser?.activeRoleId,
  });

  return {
    data: useCreation(() => {
      if (!data || !data?.length) {
        return [];
      }

      return isQuickAccessArea
        ? data?.filter((menu: MenuHierarchy) => menu?.isQuickAccessArea)
        : data?.filter((menu: MenuHierarchy) => !menu?.isQuickAccessArea);
    }, [data, isQuickAccessArea]),
  };
}

export function useMenus() {
  const { data: authUser } = useFetchAuthUser();
  const { data } = useFetchMenus({
    parentMenuId: 1,
    tenantId: authUser?.activeTenantId,
    roleIds: authUser?.activeRoleId,
  });

  return {
    data: useCreation(() => {
      if (!data || !data?.length) {
        return [];
      }

      return convertHierarchyToList(
        data,
        (node: any, depth: number, index: number, parentNode?: any) => {
          return {
            ...node,
            depth,
            parentNode,
          };
        },
      );
    }, [data]),
  };
}

export function useRenewalMenuStateFromRouting() {
  const state = useRouterState();

  const { data } = useMenus();
  const [, setActiveMenu] = useActiveMenuState();

  useEffect(() => {
    if (state.location.pathname === '/') {
      return;
    }
    const recursiveCall = (path: string) => {
      data.some((menu: Menu) => {
        if (menu.path === path) {
          if (menu.depth > 1) {
            recursiveCall(menu.parentNode.path);
            return true;
          } else {
            setActiveMenu(menu);
          }

          return true;
        }
      });
    };

    recursiveCall(state.location.pathname);
  }, [state.location?.state?.key, data]);
}
