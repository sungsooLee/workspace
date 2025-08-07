import {
  useAsyncFetchMenus,
  useLoginUser,
  useReissue,
  useUpdateAuthUser,
  useUpdateUser,
} from '@learnway/auth/entities';
import type { AuthUser } from '@learnway/auth/types';

import { RoleManagerService } from '@entities/role';
import { cookieService, MutateCallback } from '@learnway/shared';

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
  const { asyncMenus } = useAsyncFetchMenus();
  const { update: updateAuthUser } = useUpdateAuthUser();
  // const { alert: openAlert } = useModal();

  // 공통 함수: 메뉴와 역할 정보 업데이트
  const updateMenusAndRoles = async (tenantId: number, roleId: number) => {
    const [menus, myRoles] = await Promise.all([
      asyncMenus(tenantId, roleId),
      RoleManagerService.fetchMyRoles('BO'),
    ]);
    return updateAuthUser({ menus, myRoles });
  };

  return {
    login: async (
      payload: LoginParams,
      callback?: MutateCallback<any>,
    ): Promise<AuthUser | undefined> => {
      return await login(payload, {
        ...callback,
        onSuccess: async (data, variables, context) => {
          // 메뉴와 역할 정보 업데이트
          const updatedUser = await updateMenusAndRoles(
            data?.activeTenant?.tenantId,
            data?.activeRole?.roleId,
          );
          // 아이디 저장 여부 값에 따라 쿠키 설정
          payload.saveId
            ? cookieService.set('SAVED_USER_ID', payload.username)
            : cookieService.remove('SAVED_USER_ID');
          // callback 실행
          callback?.onSuccess?.(updatedUser, {}, {});
        },
        onError: async (error, variables, context) => {
          // loginErrorAlert(error);
          callback?.onError && callback.onError(error, variables, context);
        },
      });
    },
    reissue: async (): Promise<AuthUser | undefined> => {
      const user = await reissue();
      // 메뉴와 역할 정보 업데이트
      const updatedUser = await updateMenusAndRoles(
        user.activeTenant?.tenantId,
        user.activeRole?.roleId,
      );
      // await usePermissionStore.getState().fetchPermissions(); //임시 사용가능한 API 목록 Fetch
      return updatedUser;
    },
  };
}

export function getSavedUserid(): string | undefined {
  return cookieService.get('SAVED_USER_ID') ?? undefined;
}
