import { useEffect, createElement, useState, useCallback } from 'react';
import type { AxiosResponse } from 'axios';
import { useRouter } from '@tanstack/react-router';

import { tokenService } from '@learnway/config';
import { cookieService } from '@learnway/shared';
import { useModal, useModalStore } from '@learnway/ui';

import { AuthUser, AuthSSOHealthcheck } from '../../../types';
import { queryOptions } from './authorization.queries';
import { useLogoutUser, useFetchAuthUser, useUpdateUser } from './authorization.hook';
import { useSessionTimeoutAlertState } from '../state/session-timeout.state';
import { SessionTimeoutConfirm } from '../ui/sessionTimeoutConfirm';

export { queryOptions as authSSOQueryOptions };

export function assignToken(data: AxiosResponse) {
  try {
    tokenService.clear();
    tokenService.accessToken = data.headers['access-token'];
    tokenService.refreshToken = data.headers['refresh-token'];
  } catch (e) {
    tokenService.clear();
  }
}

export function removeToken() {
  tokenService.clear();
}

export function convertToAuthUser(data: AxiosResponse): AuthUser {
  //console.log('convertToAuthUser', data);
  const user = data.data;
  const { tenants } = user;
  return {
    ...user,
    activeTenant: user.tenants?.length > 0 ? tenants?.[0] : null,
    //passwordExpireDate: '2025-04-14T14:03:35.000+00:00',
    //activeTenantId: user.tenantIds?.length > 0 ? tenantIds[0] : null,
    //activeRoleId: user.roles?.length > 0 ? user.roles[0].roleId : null,
  };
}

export function getHMGSSORedirectUrl(data: AuthSSOHealthcheck): string {
  return `${import.meta.env.VITE_HMG_SSO_DOMAIN}/SPI/sso/oidc/authorize?response_type=code&scope=openid&client_id=${encodeURIComponent(data.clientId)}&redirect_uri=${encodeURIComponent(data.redirectUri)}&state=${encodeURIComponent(data.state)}`;
}

export function useSessionTimout() {
  const [isTimeoutConfirm, setIsTimeoutConfirm] = useState(false);
  const [intervalId, setIntervalId] = useState<any>();

  const { closeAll } = useModalStore();
  const { alert, confirm } = useModal();

  const router = useRouter();
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
    if (!isTimeoutConfirm && sessionDuration >= 1000 * 60 * 1) {
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
    if (sessionDuration >= 1000 * 60 * 2) {
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

  /*
  useEffect(() => {
    console.log('useEffect latestLoginDatetime', latestLoginDatetime);

    if (authUser && latestLoginDatetime) {
      if (intervalId) {
        clearInterval(intervalId);
      }
      const checkSessionTimeout = async () => {
        const now = new Date();
        const sessionDuration = now.getTime() - new Date(latestLoginDatetime).getTime();
        console.log('sessionDuration', sessionDuration);
        // 2시간(7200000ms) 경과 5분전 confirm //7200000 - 300000
        if (!isTimeoutConfirm && sessionDuration >= 7200000 - 300000) {
          confirm({
            title: '로그인 시간을 연장하시겠습니까?',
            content: createElement(SessionTimeoutConfirm),
            okButtonLabel: '로그인연장',
            cancelButtonLabel: '취소',
            onClose: (feedback: boolean) => {
              if (feedback) {
                setLatestLoginDatetime(new Date());
              } else {
                // 로그인 연장 취소한 경우 다시 묻지 않음
                setIsTimeoutConfirm(true);
              }
            },
          });
        }

        // 2시간(7200000ms) 경과 시 자동 로그아웃 alert //7200000
        if (sessionDuration >= 7200000) {
          logout(undefined, {
            onSuccess: async () => {
              await alert({
                title: '자동 로그아웃 되었습니다.',
                content:
                  '로그인 후 2시간이 경과되어 로그아웃 되었습니다.\n다시 로그인 후 이용해 주십시오',
              });
              router.navigate({ to: '/login' });
            },
          });
        }
      };
      console.log('setInterval');
      // 1분마다 세션 체크
      setIntervalId(setInterval(checkSessionTimeout, 60000));
      setSessionIntervalId(intervalId);

      return () => clearInterval(intervalId);
    } else {
      clearInterval(intervalId);
    }
  }, [authUser, isTimeoutConfirm, latestLoginDatetime, intervalId]);
  */
}
