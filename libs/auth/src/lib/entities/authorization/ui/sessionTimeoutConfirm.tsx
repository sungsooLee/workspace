import { forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { duration, DATE_TIME_FORMAT } from '@learnway/shared';
import { useModal } from '@learnway/ui';
import { useLoginTimer } from '../service/authorization.hook';

// const TIME_LIMIT_VERIFY = 300; // 5분

function SessionTimeoutConfirmComponent() {
  const { close } = useModal();
  const { t } = useTranslation();
  // const [seconds, setSeconds] = useState(TIME_LIMIT_VERIFY);

  // const timerText = duration(seconds, DATE_TIME_FORMAT.MIN_SEC);

  const { time } = useLoginTimer();

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSeconds((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(interval); // 0이 되면 타이머 멈춤
  //         console.log('close modal');
  //         close();
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>
      로그인 후 2시간이 남은 시간 경과 후 로그아웃 됩니다.
      <br />
      로그인 시간을 연장하시겠습니까?
      <div className="time">
        남은시간 : <strong>{time}</strong>
      </div>
    </>
  );
}

export const SessionTimeoutConfirm = SessionTimeoutConfirmComponent;
