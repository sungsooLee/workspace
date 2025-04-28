import { useEffect, useState, createElement, useCallback } from 'react';
import { useRouter } from '@tanstack/react-router';

import { useModal, useModalStore } from '@learnway/ui';
import { cookieService, MutateCallback } from '@learnway/shared';

import {
  useLoginUser,
  useReissue,
  useFetchAuthUser,
  useLogoutUser,
  useSessionTimeoutAlertState,
  useUpdateUser,
} from '../../../entities/authorization';
import { SessionTimeoutConfirm } from '../ui/sessionTimeoutConfirm';
import type { AuthUser, AuthSSOHealthcheck } from '../../../types';
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
          ...callback,
          onSuccess: async (data, variables, context) => {
            const menus = await asyncMenus(data.activeTenant?.tenantId);

            if (payload.saveId) {
              cookieService.set('SAVED_USER_ID', payload.username);
            } else {
              cookieService.remove('SAVED_USER_ID');
            }
            callback?.onSuccess && callback.onSuccess(updateMenu(menus), {}, {});
          },
        });
      } catch (e) {
        console.log('login error ', e);
        throw e;
      }
    },
    reissue: async (): Promise<AuthUser | undefined> => {
      const user = await reissue();
      const menus = await asyncMenus(user?.activeTenant?.tenantId);
      return updateMenu(menus);
    },
  };
}

export function getSavedUserid(): string | undefined {
  return cookieService.get('SAVED_USER_ID') ?? undefined;
}

export function getHMGSSORedirectUrl(data: AuthSSOHealthcheck): string {
  return `${import.meta.env.VITE_HMG_SSO_DOMAIN}/SPI/sso/oidc/authorize?response_type=code&scope=openid&client_id=${encodeURIComponent(data.clientId)}&redirect_uri=${encodeURIComponent(data.redirectUri)}&state=${encodeURIComponent(data.state)}`;
}

export function useSessionTimout() {
  const router = useRouter();

  const [isTimeoutConfirm, setIsTimeoutConfirm] = useState(false);
  const [intervalId, setIntervalId] = useState<any>();

  const { closeAll } = useModalStore();
  const { confirm } = useModal();

  const { logout } = useLogoutUser();
  const { data: authUser } = useFetchAuthUser();
  const { updateLatestLoginDateTime } = useUpdateUser();

  const [, setSessionTimeoutAlert] = useSessionTimeoutAlertState();

  const checkSessionTimeout = useCallback(() => {
    if (!authUser?.latestLoginDatetime) {
      console.log('none checkSessionTimeout authUser?.latestLoginDatetime');
      return;
    }
    const now = new Date();
    const sessionDuration = now.getTime() - new Date(authUser?.latestLoginDatetime).getTime();
    console.log('sessionDuration', sessionDuration);
    // 2시간(7200000ms) 경과 5분전 confirm //7200000 - 300000
    if (!isTimeoutConfirm && sessionDuration >= 7200000 - 300000) {
      //1000 * 60 * 1) {
      confirm({
        title: '로그인 시간을 연장하시겠습니까?',
        content: createElement(SessionTimeoutConfirm),
        okButtonLabel: '로그인연장',
        cancelButtonLabel: '취소',
        onClose: (feedback: boolean) => {
          if (feedback) {
            updateLatestLoginDateTime(new Date());
          } else {
            // 로그인 연장 취소한 경우 다시 묻지 않음
            setIsTimeoutConfirm(true);
          }
        },
      });
    }

    // 2시간(7200000ms) 경과 시 자동 로그아웃 alert //7200000
    if (sessionDuration >= 7200000) {
      //1000 * 60 * 2) {
      closeAll();
      logout(undefined, {
        onSuccess: async () => {
          setSessionTimeoutAlert(true);
          router.navigate({ to: '/login' });
        },
      });
    }
  }, [authUser?.latestLoginDatetime, isTimeoutConfirm]);

  useEffect(() => {
    console.log('set interval effect');
    if (!authUser || !checkSessionTimeout) {
      console.log('set interval effect - 사용자 정보가 없음 clearinterval');
      setIsTimeoutConfirm(false);
      clearInterval(intervalId);
      return;
    }

    setIntervalId((intervalState: any) => {
      if (intervalState) {
        console.log('setIntervalId before clearInterval');
        clearInterval(intervalState);
      }
      console.log('set interval effect - set');
      return setInterval(checkSessionTimeout, 60000);
    }); // 1분마다 세션 체크
  }, [authUser, checkSessionTimeout]);
}
