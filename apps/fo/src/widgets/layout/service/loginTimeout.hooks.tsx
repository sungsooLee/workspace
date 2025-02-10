import { useRouter } from '@tanstack/react-router';
import { useModalControl } from '@learnway/ui';
import { useFetchAuthUser, useLogoutUser } from '../../../entities/user';
import { useCallback, useEffect, useRef, useState } from 'react';

const mockAuthAPI = {
  getCurrentToken: () => ({
    token: 'mock-token-' + Math.random(),
    expiresIn: 120, // 2분
  }),
  extendToken: () => ({
    token: 'mock-token-' + Math.random(),
    expiresIn: 120, // 2분
  }),
};

export const useLoginTimeout = () => {
  const router = useRouter();
  const { alert } = useModalControl();
  const { data } = useFetchAuthUser();
  const { logout } = useLogoutUser();
  const extensionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [remainingTime, setRemainingTime] = useState<number>(30);

  const clearTimers = useCallback(() => {
    if (extensionTimerRef.current) clearTimeout(extensionTimerRef.current);
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
  }, []);

  const handleLogout = useCallback(() => {
    clearTimers();
    logout();
    // setTokenInfo(null);
    alert({
      title: '자동 로그아웃',
      description: '로그인 시간이 만료되어 자동 로그아웃되었습니다.',
      onClose: () => {
        router.navigate({ to: '/login' });
      },
    });
  }, [router, clearTimers, logout, alert]);
  const startCountdown = useCallback(() => {
    setRemainingTime(30);

    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }

    countdownIntervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current!);
          handleLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [handleLogout]);

  const showExtensionModal = useCallback(() => {
    alert({
      title: '로그인 시간을 연장하시겠습니까?',
      description: (
        <div>
          로그인 시간이 곧 만료됩니다.
          <br />
          로그인 시간을 연장하시겠습니까?
          <div className="time">
            남은시간:{' '}
            <strong>
              {Math.floor(remainingTime / 60)}분 {remainingTime % 60}초
            </strong>
          </div>
        </div>
      ),
      isConfirm: true,
      okButtonLabel: '로그인연장',
      onClose: (confirmed) => {
        if (confirmed) {
          const newToken = mockAuthAPI.extendToken();
          clearTimers();
          initializeTimers(newToken);
        }
      },
    });

    startCountdown();
  }, [remainingTime, clearTimers, alert, startCountdown]);

  const initializeTimers = useCallback(
    (token: { expiresIn: number }) => {
      const loginTime = new Date().getTime();
      const extensionTime = loginTime + (token.expiresIn - 30) * 1000; // 만료 30초 전
      const logoutTime = loginTime + token.expiresIn * 1000;

      extensionTimerRef.current = setTimeout(
        () => {
          showExtensionModal();
        },
        Math.max(0, extensionTime - Date.now()),
      );

      logoutTimerRef.current = setTimeout(
        () => {
          handleLogout();
        },
        Math.max(0, logoutTime - Date.now()),
      );
    },
    [showExtensionModal, handleLogout],
  );

  useEffect(() => {
    const initialToken = mockAuthAPI.getCurrentToken();
    initializeTimers(initialToken);

    return clearTimers;
  }, [clearTimers, initializeTimers]);

  return {
    remainingTime,
  };
};
