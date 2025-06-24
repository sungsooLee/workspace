// import { useTokenStore } from './../../../../../../config/src/lib/store/token-store';
import { useQuery, useMutation, useQueryClient, MutateOptions } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

import { DATE_TIME_FORMAT, duration, type MutateCallback } from '@learnway/shared';

import type { AuthUser } from '../../../types';
import { queryKeys, queryOptions, mutateOptions } from './authorization.queries';
import { createElement, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useModal } from '@learnway/ui';
import { useTranslation } from 'react-i18next';
import { SessionTimeoutConfirm } from '../ui/sessionTimeoutConfirm';
import { useExpStore } from '../store/use-exp-store';

export const authUserQueryKeys = queryKeys;

export function useFetchAuthUser<T = AuthUser>() {
  return useQuery<unknown, unknown, T>(queryOptions.authUser());
}

export function useUpdateAuthUser<T = AuthUser>() {
  const queryClient = useQueryClient();
  return {
    update: (payload: any): AuthUser | undefined => {
      const user = queryClient.getQueryData(queryKeys.authUser);
      if (!user) {
        return;
      }
      queryClient.setQueryData(queryKeys.authUser, { ...user, ...payload });

      return { ...user, ...payload } as AuthUser;
    },
  };
}

export function useLoginUser(mutationOptions = {}) {
  const queryClient = useQueryClient();
  const { setExp, reset } = useExpStore();
  const { mutateAsync, isSuccess, isError } = useMutation({
    ...mutateOptions.login(),
    onSuccess: async (data: any, variables, context) => {
      reset();
      setExp(data.exp);
      queryClient.setQueryData(queryKeys.authUser, data);
    },
    ...mutationOptions,
  });

  return {
    login: (payload: any, callback?: MutateCallback<any>) => {
      return mutateAsync(payload, callback);
    },
    isSuccess,
    isError,
  };
}

export function useReissue(mutationOptions = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setExp, setShowAlert } = useExpStore();

  const { mutateAsync, isSuccess, isError } = useMutation({
    ...mutateOptions.reissue(),
    onSuccess: async (data: any, variables, context) => {
      setExp(data.exp);
      setShowAlert(false);
      queryClient.setQueryData(queryKeys.authUser, data);
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.authUser });
      router.navigate({ to: '/login' });
    },
    ...mutationOptions,
  });

  return {
    reissue: () => {
      return mutateAsync();
    },
    isSuccess,
    isError,
  };
}

export function useLogoutUser(mutationOptions = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { reset } = useExpStore();

  const { mutate, isSuccess, isError } = useMutation({
    ...mutateOptions.logout(),
    onSuccess: async (data) => {
      reset();
      queryClient.invalidateQueries({ queryKey: queryKeys.authUser });
      queryClient.removeQueries({ queryKey: queryKeys.authUser });
    },
    ...mutationOptions,
  });

  return {
    logout: (payload?: any, callback?: MutateCallback<any>) => {
      // callback?.onSuccess가 정의가 없는 경우 default로 login 페이지로 이동
      if (!callback?.onSuccess) {
        mutate(payload, {
          ...callback,
          onSuccess: (data) => {
            reset();
            queryClient.invalidateQueries({ queryKey: queryKeys.authUser });
            queryClient.removeQueries({ queryKey: queryKeys.authUser });
            router.navigate({ to: '/login' });
          },
        });
        return;
      }

      // callback?.onSuccess 정의가 있는 경우 navigate 처리까지 callback에 일임
      mutate(payload, callback);
    },
    isSuccess,
    isError,
  };
}

export function useLoginTimer() {
  // 로그인 연장 팝업 5분 남았을때 생성
  const REISSUE_TIME = 60 * 5; // 5분

  const { t } = useTranslation();
  const router = useRouter();
  const { logout } = useLogoutUser();
  const { reissue } = useReissue();
  const { exp, showAlert, setShowAlert, reset } = useExpStore((state) => state);
  const { alert: openAlert, confirm: openConfirm, closeAll } = useModal();

  const [remainingTime, setRemainingTime] = useState<string>('');

  const intervalRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (!exp) return;

    const update = () => {
      const remainingSeconds = getRemainingTime(exp);
      const hours = Math.floor(remainingSeconds / 3600)
        .toString()
        .padStart(2, '0');
      const minutes = Math.floor((remainingSeconds % 3600) / 60)
        .toString()
        .padStart(2, '0');
      const seconds = (remainingSeconds % 60).toString().padStart(2, '0');

      // setRemainingTime(`${hours}:${minutes}:${seconds}`);
      setRemainingTime(`${minutes}:${seconds}`);
      if (remainingSeconds <= REISSUE_TIME && remainingSeconds > 0 && !showAlert) {
        setShowAlert(true);
        handleReissue();
      } else if (remainingSeconds === 0) {
        handleLogout();
        intervalRef.current && clearInterval(intervalRef.current);
      }
    };

    update();

    const interval = setInterval(update, 1000);
    intervalRef.current = interval;
    return () => clearInterval(interval);
  }, [exp, showAlert]);

  function getRemainingTime(exp: string) {
    try {
      const now = dayjs().utc().unix() * 1000; // 현재 시간 (초 단위)
      const time = Math.floor((parseInt(exp) - now) / 1000);
      return time;
    } catch (error) {
      return 0;
    }
  }

  function handleLogout() {
    closeAll();
    logout(undefined, {
      onSuccess: () => {
        openAlert({
          title: '자동 로그아웃 되었습니다.',
          content:
            '로그인 후 2시간이 경과되어 로그아웃 되었습니다.\n다시 로그인 후 이용해 주십시오',
          onClose: () => {
            router.navigate({ to: '/' });
          },
        });
      },
      onError: () => {
        openAlert({
          title: '자동 로그아웃 되었습니다.',
          content:
            '로그인 후 2시간이 경과되어 로그아웃 되었습니다.\n다시 로그인 후 이용해 주십시오',
          onClose: () => {
            router.navigate({ to: '/' });
          },
        });
      },
    });

    reset();
  }

  async function handleReissue() {
    console.log('handleReissue');
    openConfirm({
      title: t('LABEL.message.loginExtensionAlert'),
      content: createElement(SessionTimeoutConfirm),
      okButtonLabel: t('LABEL.common.loginExtension'),
      cancelButtonLabel: t('LABEL.common.cancel'),
      onClose: async (feedback: boolean) => {
        if (feedback) {
          await reissue();
          setShowAlert(true);
          closeAll();
        } else {
          // 로그인 연장 취소한 경우 다시 묻지 않음
          closeAll();
        }
      },
    });
  }

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key !== 'exp-storage') return;
      if (!e.newValue) return;

      try {
        const newState = JSON.parse(e.newValue);
        const newExp = newState?.state?.exp;

        if (typeof newExp === 'string') {
          useExpStore.getState().setExp(newExp);
        } else {
          useExpStore.getState().reset();
        }
      } catch (err) {
        console.error('Failed to sync auth state from localStorage:', err);
      }
    };

    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return {
    time: remainingTime,
  };
}
