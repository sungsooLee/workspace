import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useModalControl, useModalStore } from '@learnway/ui';
import { useLogoutUser } from '../../../entities/auth';
interface ExtensionModalProps {
  initialTime: number;
  onTimeout: () => void;
  onClose?: () => void;
}

const ExtensionModal = memo(({ initialTime, onTimeout }: ExtensionModalProps) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        const nextTime = prev - 1;
        if (nextTime <= 0) {
          //인터벌 종료
          clearInterval(interval);
          // 콜백 호출
          onTimeout();
        }
        return nextTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeout]);

  return (
    <div>
      로그인 시간이 곧 만료됩니다.
      <br />
      로그인 시간을 연장하시겠습니까?
      <div className="time">
        남은시간:{' '}
        <strong>
          {Math.floor(remainingTime / 60)}분 {Math.max(0, remainingTime % 60)}초
        </strong>
      </div>
    </div>
  );
});

export function useLoginTimeout() {
  const endTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const isCancelAlert = useRef<boolean | null>(false);
  const { alert: openAlert } = useModalControl();
  const { logout } = useLogoutUser();

  const handleLogout = useCallback(() => {
    try {
      useModalStore.setState({ modals: [] });
      openAlert({
        title: '자동 로그아웃',
        description: '로그인 시간이 만료되어 자동 로그아웃되었습니다.',
        isConfirm: false,
        iconVisible: true,
        alertType: 'caution',
        onClose: () => {
          logout();
        },
      });
    } catch (error) {
      console.error('로그아웃 처리 중 에러 발생', error);
    }
  }, [logout, openAlert]);

  const startTimer = useCallback(() => {
    //타이머 시작전 기존 인터벌 제거
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      //현재 시간 계산
      const currentTime = Math.floor(Date.now() / 1000);
      //종료 시간 - 현재시간 = 남은시간
      const timeRemain = endTimeRef.current! - currentTime;
      console.log(timeRemain);
      // 남은 시간이 10초 이하
      // 연장 창을 한번도 안껐을 경우
      if (timeRemain <= 5 && !isCancelAlert.current) {
        openAlert({
          title: '로그인 시간 연장',
          description: <ExtensionModal initialTime={5} onTimeout={handleLogout} />,
          isConfirm: true,
          iconVisible: false,
          okButtonLabel: '로그인연장',
          onClose: (result?: boolean) => {
            // 로그인 연장
            if (result === true) {
              const newExpireTime = Math.floor(Date.now() / 1000) + 10;
              endTimeRef.current = newExpireTime;
              startTimer(); // 연장 시 타이머 재시작
            }
            // 로그인 연장 X | 그냥 껐을 경우에
            else {
              //  종료시간 - 현재 시간
              const remainingSeconds = endTimeRef.current! - Math.floor(Date.now() / 1000);
              // 연장 창을 껐기 때문에 다시 띄우지 않음.
              isCancelAlert.current = true;
              if (remainingSeconds > 0) {
                startTimer();
              }
            }
          },
        });
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
      }
      // alert 창 떠도 아무것도 안하였을때
      if (timeRemain <= 0) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        handleLogout();
      }
    }, 1000);
  }, [openAlert, handleLogout]);

  const startSession = useCallback(() => {
    const expireTime = Math.floor(Date.now() / 1000) + 10;
    endTimeRef.current = expireTime;
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        isCancelAlert.current = false;
      }
    };
  }, []);

  return {
    startSession,
  };
}
