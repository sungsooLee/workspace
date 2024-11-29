import { useFetchMenus } from '../../../entities/menu';
import { useFetchAuthUser } from '../../../entities/user';

export function useMenus() {
  const { data: authUser } = useFetchAuthUser();
  const { data } = useFetchMenus({
    parentMenuId: 1,
    tenantId: authUser?.activeTenantId,
    roleIds: authUser?.activeRoleId,
  });

  return { data };
}
