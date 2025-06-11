import { last } from 'lodash';
import { useCallback, useEffect, useMemo } from 'react';
import { useCreation } from 'ahooks';
import { useRouterState } from '@tanstack/react-router';

import { useFetchAuthUser } from '../../authorization';

import { useFetchMenus } from './menu.hook';
import { Menu } from '../../../types';

import { useActiveMenuDepthState } from '../state/menu.state';
import { useLayoutStore } from '../store/use-layout-sotre';
import { useModal } from '@learnway/ui';

/**
 * 메뉴 정보를 트리 구조로 반환
 * isShortCutArea 에 따라 GNB quick menu area에 메뉴를 출력한다.
 */
export function useMenuHierarchy(menuScope = 'BO') {
  const { data: authUser } = useFetchAuthUser();
  const { data } = useFetchMenus(authUser?.activeTenant?.tenantId);

  return {
    data: useCreation(() => {
      if (!data || !data?.length) {
        return {
          menus: [],
          eventMenus: [],
        };
      }

      return {
        menus: data?.filter((menu: Menu) => menu?.menuScope === menuScope),
        eventMenus: data?.filter((menu: Menu) => menu?.menuScope === 'EX'),
      };
    }, [data]),
  };
}

/**
 * Routing 상태 변경 시 Active menu depth 상태 정보 갱신
 */
export function useRenewalMenuStateFromRouting() {
  const state = useRouterState();

  const { data: authUser } = useFetchAuthUser();
  const [, setActiveMenuDepth] = useActiveMenuDepthState();
  const { setMenus } = useLayoutStore((state) => state); // 최근본 메뉴

  useEffect(() => {
    if (!authUser?.menus) {
      return;
    }

    // window를 any 타입으로 단언하여 접근
    const env = (window as any).__ENV__ || {};
    const basePath = env.BASE_PATH || '';

    // 현재 pathname에서 basePath 제거하여 실제 라우트 경로 추출
    let currentPath = state.location.pathname;
    if (basePath && currentPath.startsWith(basePath)) {
      currentPath = currentPath.substring(basePath.length) || '/';
    }
    // if (currentPath === '/') {
    //   setActiveMenuDepth([]);
    //   return;
    // }
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

    recursiveCall(currentPath);
    // 최근본 메뉴
    const recentMenu = authUser.menus.find((menu: Menu) => menu.path === currentPath);
    recentMenu && setMenus(recentMenu);
  }, [state.location?.state?.key, authUser?.menus]);
}

/**
 * 현재 경로의 개인정보 포함 여부를 체크하는 훅
 */
export function usePersonalInfoCheck() {
  const state = useRouterState();

  const { data: authUser } = useFetchAuthUser();

  // 현재 메뉴 정보 계산
  const currentMenu = useMemo(() => {
    if (!authUser?.menus) {
      return null;
    }

    const env = (window as any).__ENV__ || {};
    const basePath = env.BASE_PATH || '';

    let currentPath = state.location.pathname;

    if (basePath && currentPath.startsWith(basePath)) {
      currentPath = currentPath.substring(basePath.length) || '/';
    }

    return authUser.menus.find((menu: Menu) => menu.path === currentPath) || null;
  }, [state.location.pathname, authUser?.menus]);

  // 개인정보 포함 여부
  const hasPersonalInfo = useMemo(() => {
    return currentMenu?.isPersoninfoInclusion || false;
  }, [currentMenu]);

  return {
    hasPersonalInfo,
    currentMenu,
  };
}
