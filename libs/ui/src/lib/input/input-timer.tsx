import { forwardRef, useEffect, useState } from 'react';
import { Input, InputProps } from './input';
import { duration } from '@learnway/shared';

export interface InputTimerProps extends InputProps {
  // 타이머 시작 유무
  startTimer: number;
  // 타이머 시간 (초) - 30 = 30초, 60 = 1분
  initialTime: number;
  // 타이머 종료시 (00:00) 실행되는 함수
  onTimerEnd?: () => void;
}

const InputTimerComponent = forwardRef<HTMLInputElement, InputTimerProps>(
  (
    { type = 'text', className, value = '', startTimer, initialTime, onTimerEnd, ...props },
    ref,
  ) => {
    const [seconds, setSeconds] = useState(initialTime);

    const timerText = startTimer === 0 ? '' : duration({ seconds }, 'mm:ss').toString();

    useEffect(() => {
      // 0 이라는건 input-timer 최초 로드 했을경우 or 사용하는 곳에서 타이머 정지를 목적으로 0을 설정한 경우
      if (startTimer === 0) return;

      // 타이머 시작 시 seconds 초기화
      setSeconds(initialTime);

      const interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval); // 0이 되면 타이머 멈춤
            onTimerEnd?.(); // 타이머 종료 callback
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }, [startTimer, initialTime]); // isTimerActive가 변경될 때마다 실행됨

    return <Input {...props} timerText={timerText} />;
  },
);

export const InputTimer = InputTimerComponent;
