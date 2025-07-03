import { LoginErrorAlert } from './../ui/login-error-alert';
import {
  useLoginUser,
  useReissue,
  useUpdateUser,
  useUpdateAuthUser,
  useAsycFetchMenus,
} from '@learnway/auth/entities';
import { AUTH_ERROR_CODE } from '@learnway/auth/features/auth';
import type { AuthUser } from '@learnway/auth/types';
import { useModal } from '@learnway/ui';

import { cookieService, MutateCallback } from '@learnway/shared';
import { usePermissionStore } from '../../../shared/lib/permission-store';
import { t } from 'i18next';
import RoleManagerService from '../../../entities/role/api/role-manager';

interface LoginParams {
  username: string;
  password: string;
  saveId?: boolean;
}

export function useAuthSignin() {
  //const { t } = useTranslation();
  const { login } = useLoginUser();
  const { reissue } = useReissue();
  const { updateMenu } = useUpdateUser();
  const { asyncMenus } = useAsycFetchMenus();
  const { update: updateAuthUser } = useUpdateAuthUser();
  // const { alert: openAlert } = useModal();

  return {
    login: async (
      payload: LoginParams,
      callback?: MutateCallback<any>,
    ): Promise<AuthUser | undefined> => {
      return await login(payload, {
        ...callback,
        onSuccess: async (data, variables, context) => {
          // 메뉴 조회
          const menus = await asyncMenus(data.activeTenant?.tenantId);
          // 나의 역할 목록 조회
          const myRoles = await RoleManagerService.fetchMyRoles('BO');
          // 역할 정보를 전역 상태에 저장
          updateAuthUser({ myRoles });

          if (payload.saveId) {
            cookieService.set('SAVED_USER_ID', payload.username);
          } else {
            cookieService.remove('SAVED_USER_ID');
          }
          callback?.onSuccess && callback.onSuccess(updateMenu(menus), {}, {});
        },
        onError: async (error, variables, context) => {
          // loginErrorAlert(error);
          callback?.onError && callback.onError(error, variables, context);
        },
      });
      /*
      } catch (e) {
        console.log('login error ', e);
        throw e;
      }*/
    },
    reissue: async (): Promise<AuthUser | undefined> => {
      const user = await reissue();
      const menus = await asyncMenus(user?.activeTenant.tenantId);
      // await usePermissionStore.getState().fetchPermissions(); //임시 사용가능한 API 목록 Fetch
      return updateMenu(menus);
    },
  };
}

export function getSavedUserid(): string | undefined {
  return cookieService.get('SAVED_USER_ID') ?? undefined;
}
