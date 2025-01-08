import { useCreation } from 'ahooks';

import { useFetchMenus } from '../../../entities/menu';
import { useFetchAuthUser } from '../../../entities/user';
import { Menu } from '../../../types';

export function useMenus() {
  const { data: authUser } = useFetchAuthUser();
  const { data } = useFetchMenus({
    parentMenuId: 1,
    tenantId: authUser?.activeTenantId,
    roleIds: authUser?.activeRoleId,
  });

  return {
    data: useCreation(() => {
      if (!data) {
        return [];
      }
      if (!data?.[0] || !data?.length) {
        return [];
      }
      const menus = data[0].children;

      return menus?.filter((menu: Menu) => !menu?.isDirect);
    }, [data]),
  };
}

export function useQuickMenus() {
  const { data: authUser } = useFetchAuthUser();
  const { data } = useFetchMenus({
    parentMenuId: 1,
    tenantId: authUser?.activeTenantId,
    roleIds: authUser?.activeRoleId,
  });

  return {
    data: useCreation(() => {
      if (!data) {
        return [];
      }
      if (!data?.[0] || !data?.length) {
        return [];
      }
      const menus = data[0].children;

      return menus?.filter((menu: Menu) => menu?.isDirect);
    }, [data]),
  };
}
