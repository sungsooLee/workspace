import { useLoginUser, useReissue, useUpdateUser } from '../../../entities/user';
import { useAsycFetchMenus } from '../../../entities/menu';
import type { AuthUser } from '../../../types';

interface LoginParams {
  username: string;
  password: string;
}

export function useAuthSignin() {
  const { login } = useLoginUser();
  const { reissue } = useReissue();
  const { updateMenu } = useUpdateUser();
  const { asyncMenus } = useAsycFetchMenus();

  return {
    login: async (payload: LoginParams): Promise<AuthUser | undefined> => {
      const user = await login(payload);
      const menus = await asyncMenus({
        parentMenuId: 1,
        tenantId: user?.activeTenantId,
        //roleIds: authUser?.activeRoleId,
      });
      return updateMenu(menus);
    },
    reissue: async (): Promise<AuthUser | undefined> => {
      const user = await reissue();
      const menus = await asyncMenus({
        parentMenuId: 1,
        tenantId: user?.activeTenantId,
        //roleIds: authUser?.activeRoleId,
      });
      return updateMenu(menus);
    },
  };
}
