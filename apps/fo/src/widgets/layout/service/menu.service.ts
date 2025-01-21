import { useEffect } from 'react';
import { useCreation } from 'ahooks';
import { useRouterState } from '@tanstack/react-router';

import { convertHierarchyToList, getRandomId } from '@learnway/shared';

import { useFetchMenus } from '../../../entities/menu';
import { useFetchAuthUser } from '../../../entities/user';

import { useActiveMenuDepthState } from '../../../features/layout';
import { HookData, Menu } from '../../../types';

/**
 * 메뉴 정보를 트리 구조로 반환
 * isQuickAccessArea 에 따라 GNB quick menu area에 메뉴를 출력한다.
 */
export function useMenuHierarchy(isQuickAccessArea = false): HookData<Menu[]> {
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
        ? data?.filter((menu: Menu) => menu?.isQuickAccessArea)
        : data?.filter((menu: Menu) => !menu?.isQuickAccessArea);
    }, [data, isQuickAccessArea]),
  };
}

/**
 * 전체 메뉴 정보를 리스트로 반환
 * isQuickAccessArea 에 따라 GNB quick menu area에 메뉴를 출력한다.
 */
export function useMenus(): HookData<Menu[]> {
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
        /*
        (node: any, depth: number, index: number, parentNode?: any) => {
          node['depth'] = depth;
          node['parentNode'] = parentNode;
          node['key'] = getRandomId();
          return node;
        },*/
      );
    }, [data]),
  };
}

/**
 * Routing 상태 변경 시 Active menu depth 상태 정보 갱신
 */
export function useRenewalMenuStateFromRouting() {
  const state = useRouterState();

  const { data } = useMenus();
  const [, setActiveMenuDepth] = useActiveMenuDepthState();

  useEffect(() => {
    if (state.location.pathname === '/') {
      return;
    }
    const depths: Menu[] = [];
    const recursiveCall = (path: string) => {
      data.some((menu: Menu) => {
        if (menu.path === path) {
          depths.unshift(menu);
          if (menu.depth === 1) {
            setActiveMenuDepth(depths);
          } else {
            recursiveCall(menu.parentNode.path);
          }
          return true;
        }
      });
    };

    recursiveCall(state.location.pathname);
  }, [state.location?.state?.key, data]);
}
