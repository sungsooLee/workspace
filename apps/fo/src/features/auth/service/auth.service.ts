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
          if (payload.saveId) {
            cookieService.set('SAVED_USER_ID', payload.username);
          } else {
            cookieService.remove('SAVED_USER_ID');
          }
          if (data.roles && data.roles.length > 0) {
            const menus = await asyncMenus(
              data.activeTenant?.tenantId,
              data.roles?.map((role: any) => role.roleId).join(','),
            );
            updateMenu(menus);
          }
          callback?.onSuccess && callback.onSuccess(data, {}, {});
        },
        onError: async (error, variables, context) => {
          alert({ title: 'LABEL.messages.invalidInputInformation', content: error?.message });
          callback?.onError && callback.onError(error, variables, context);
        },
      });
    },
    reissue: async (): Promise<AuthUser | undefined> => {
      const user = await reissue();
      if (user.roles && user.roles.length > 0) {
        const menus = await asyncMenus(
          user.activeTenant?.tenantId,
          user.roles?.map((role: any) => role.roleId).join(','),
        );
        return updateMenu(menus);
      }
      return user;
    },
  };
}

export function getSavedUserid(): string | undefined {
  return cookieService.get('SAVED_USER_ID') ?? undefined;
}
