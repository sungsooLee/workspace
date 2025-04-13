import { useLoginUser, useReissue, useUpdateUser } from '@learnway/config';
import type { AuthUser } from '@learnway/config';

import { useAsycFetchMenus } from '../../../entities/menu';

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
      const menus = await asyncMenus(user?.activeTenant?.tenantNo);
      return updateMenu(menus);
    },
    reissue: async (): Promise<AuthUser | undefined> => {
      const user = await reissue();
      const menus = await asyncMenus(user?.activeTenant?.tenantNo);
      return updateMenu(menus);
    },
  };
}
