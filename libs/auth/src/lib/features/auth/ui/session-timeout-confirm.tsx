import { useTranslation } from 'react-i18next';

import { DATE_TIME_FORMAT, duration } from '@learnway/shared';
import { useCounter } from 'ahooks';
import { useEffect, useState } from 'react';

const initialTime = 300;

function SessionTimeoutConfirmComponent() {
  const { t } = useTranslation();

  const [seconds, setSeconds] = useState(initialTime);
  const [timer, timerCounter] = useCounter(initialTime);

  const timerText = timer === 0 ? '' : duration(seconds, DATE_TIME_FORMAT.MIN_SEC);

  useEffect(() => {
    // 0 이라는건 input-timer 최초 로드 했을경우 or 사용하는 곳에서 타이머 정지를 목적으로 0을 설정한 경우
    if (timer === 0) return;

    // 타이머 시작 시 seconds 초기화
    // setSeconds(initialTime);

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval); // 0이 되면 타이머 멈춤
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]); // isTimerActive가 변경될 때마다 실행됨

  return (
    <div>
      <p className="whitespace-break-spaces">{t('LABEL.messages.sessionExtensionConfirm')}</p>
      <div className="time">
        {`${t('LABEL.common.remainingTime')} : `}
        <strong>{timerText}</strong>
      </div>
    </div>
  );
}

export const SessionTimeoutConfirm = SessionTimeoutConfirmComponent;
