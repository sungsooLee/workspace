import { useLoginUser, useReissue, useUpdateUser } from '@learnway/config';
import type { AuthUser } from '@learnway/config';

import { cookieService, MutateCallback } from '@learnway/shared';

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
    login: async (
      payload: LoginParams,
      callback?: MutateCallback<any>,
    ): Promise<AuthUser | undefined> => {
      try {
        return await login(payload, {
          onSuccess: async (data, variables, context) => {
            console.log(data);
            const menus = await asyncMenus(data.activeTenant?.tenantNo);

            if (payload.saveId) {
              cookieService.set('SAVED_USER_ID', payload.username);
            } else {
              cookieService.remove('SAVED_USER_ID');
            }
            return updateMenu(menus);
          },
        });
      } catch (e) {
        console.log('login error ', e);
        throw e;
      }
    },
    reissue: async (): Promise<AuthUser | undefined> => {
      const user = await reissue();
      const menus = await asyncMenus(user?.activeTenant?.tenantNo);
      return updateMenu(menus);
    },
  };
}

export function getSavedUserid(): string | undefined {
  return cookieService.get('SAVED_USER_ID') ?? undefined;
}
