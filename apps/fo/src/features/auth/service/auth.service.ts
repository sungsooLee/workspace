import {
  useLoginUser,
  useReissue,
  useUpdateUser,
  useAsycFetchMenus,
} from '@learnway/auth/entities';
import type { AuthUser } from '@learnway/auth/types';
import { getConfig } from '@learnway/config';
import { cookieService, MutateCallback } from '@learnway/shared';
import { useModal } from '@learnway/ui';

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
  const { alert } = useModal();

  return {
    login: async (
      payload: LoginParams,
      callback?: MutateCallback<any>,
    ): Promise<AuthUser | undefined> => {
      return await login(payload, {
        ...callback,
        onSuccess: async (data, variables, context) => {
          const menus = await asyncMenus(
            data.activeTenant?.tenantId,
            getConfig().APP_INFO === 'BO'
              ? data.activeRole?.roleId
              : data.roles?.map((role: any) => role.roleId).join(','),
          );

          if (payload.saveId) {
            cookieService.set('SAVED_USER_ID', payload.username);
          } else {
            cookieService.remove('SAVED_USER_ID');
          }
          callback?.onSuccess && callback.onSuccess(updateMenu(menus), {}, {});
        },
        onError: async (error, variables, context) => {
          alert({ title: 'LABEL.messages.invalidInputInformation', content: error?.message });
          callback?.onError && callback.onError(error, variables, context);
        },
      });
    },
    reissue: async (): Promise<AuthUser | undefined> => {
      const user = await reissue();
      const menus = await asyncMenus(user?.activeTenant?.tenantId, user.activeRole?.roleId);
      return updateMenu(menus);
    },
  };
}

export function getSavedUserid(): string | undefined {
  return cookieService.get('SAVED_USER_ID') ?? undefined;
}
