import { useEffect, useState, createElement, useCallback, useRef } from 'react';
import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useModal, useModalStore } from '@learnway/ui';
import { cookieService, MutateCallback } from '@learnway/shared';

import {
  useLoginUser,
  useReissue,
  useFetchAuthUser,
  useLogoutUser,
  useSessionTimeoutAlertState,
  useUpdateUser,
} from '../../../entities';
import { SessionTimeoutConfirm } from '../ui/sessionTimeoutConfirm';
import type { AuthUser, AuthSSOHealthcheck } from '../../../types';
import { useAsycFetchMenus } from '../../../entities/menu';

import {
  SESSION_TIMEOUT_EXTENSION_ALERT_DURATION,
  SESSION_TIMEOUT_LIMIT_DURATION,
} from '../const/auth.constant';

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
  const { t } = useTranslation();
  const router = useRouter();

  const [isTimeoutConfirm, setIsTimeoutConfirm] = useState(false);
  const intervalRef = useRef<any>();

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
    if (
      !isTimeoutConfirm &&
      sessionDuration >= SESSION_TIMEOUT_LIMIT_DURATION - SESSION_TIMEOUT_EXTENSION_ALERT_DURATION
    ) {
      //1000 * 60 * 1) {
      confirm({
        title: t('LABEL.message.loginExtensionAlert'),
        content: createElement(SessionTimeoutConfirm),
        okButtonLabel: t('LABEL.common.loginExtension'),
        cancelButtonLabel: t('LABEL.common.cancel'),
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
    if (sessionDuration >= SESSION_TIMEOUT_LIMIT_DURATION) {
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
    if (intervalRef.current) {
      console.log('set interval effect - 기존 interval정보가 있으므로 clearinterval');
      clearInterval(intervalRef.current);
    }
    if (!authUser || !checkSessionTimeout) {
      console.log('set interval effect - 사용자 정보가 없음 return');
      setIsTimeoutConfirm(false);
      return;
    }
    console.log('set interval effect - 새로운 interval 생성');
    intervalRef.current = setInterval(checkSessionTimeout, 60000); // 1분마다 세션 체크
  }, [authUser, checkSessionTimeout]);
}
