import { useLoginUser, useReissue, useUpdateUser } from '@learnway/config';
import type { AuthUser } from '@learnway/config';

import { cookieService } from '@learnway/shared';

import { useAsycFetchMenus } from '../../../entities/menu';

interface LoginParams {
  username: string;
  password: string;
  saveId?: boolean;
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

      if (payload.saveId) {
        cookieService.set('SAVED_USER_ID', payload.username);
      }
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

export function getSavedUserid(): string | undefined {
  return cookieService.get('SAVED_USER_ID') ?? undefined;
}
