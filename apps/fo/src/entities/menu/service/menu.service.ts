import { useCreation } from 'ahooks';

import { useFetchAuthUser } from '@learnway/auth';
import type { Menu } from '@learnway/auth';

import { useFetchMenus } from '..';
import { HookData } from '../../../types';

/**
 * 메뉴 정보를 트리 구조로 반환
 * isShortCutArea 에 따라 GNB quick menu area에 메뉴를 출력한다.
 */
export function useMenuHierarchy(): HookData<{ menus: Menu[]; eventMenus: Menu[] }> {
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
        menus: data?.filter((menu: Menu) => menu?.menuScope === 'FO'),
        eventMenus: data?.filter((menu: Menu) => menu?.menuScope === 'EX'),
      };
    }, [data]),
  };
}
