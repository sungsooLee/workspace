import { useEffect } from 'react';
import { useCreation } from 'ahooks';
import { useRouterState } from '@tanstack/react-router';

import { useFetchAuthUser } from '@learnway/config';

import { useFetchMenus } from '../../../entities/menu';
import { Menu, HookData } from '../../../types';
import { useActiveMenuDepthState } from '../../../features/platform';

/**
 * 메뉴 정보를 트리 구조로 반환
 * quickAccessAreaYn 에 따라 GNB quick menu area에 메뉴를 출력한다.
 */
export function useMenuHierarchy(quickAccessAreaYn = false): HookData<Menu[]> {
  const { data: authUser } = useFetchAuthUser();
  const { data } = useFetchMenus(authUser?.activeTenant?.tenantNo);

  return {
    data: useCreation(() => {
      if (!data || !data?.length) {
        return [];
      }

      return quickAccessAreaYn
        ? data?.filter((menu: Menu) => menu?.quickAccessAreaYn)
        : data?.filter((menu: Menu) => !menu?.quickAccessAreaYn);
    }, [data, quickAccessAreaYn]),
  };
}

/**
 * Routing 상태 변경 시 Active menu depth 상태 정보 갱신
 */
export function useRenewalMenuStateFromRouting() {
  const state = useRouterState();

  const { data: authUser } = useFetchAuthUser();
  const [, setActiveMenuDepth] = useActiveMenuDepthState();

  useEffect(() => {
    if (!authUser?.menus) {
      return;
    }
    if (state.location.pathname === '/') {
      setActiveMenuDepth([]);
      return;
    }
    const depths: Menu[] = [];
    const recursiveCall = (path: string) => {
      authUser.menus.some((menu: Menu) => {
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
  }, [state.location?.state?.key, authUser?.menus]);
}
