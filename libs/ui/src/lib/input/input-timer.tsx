import { forwardRef, useEffect, useState } from 'react';
import { useCounter } from 'react-use';

import { duration, cn } from '@learnway/shared';

import { Input, InputProps } from './input';
import { Button } from '../button/button';
import styles from './input-timer.module.css';

export interface InputTimerProps extends InputProps {
  // 타이머 시작 유무
  startTimer: number;
  // 타이머 시간 (초) - 30 = 30초, 60 = 1분
  initialTime: number;
  // 타이머 종료시 (00:00) 실행되는 함수
  onTimerEnd?: () => void;
  resetLabel?: string;
  onReset?: () => void;
}

const InputTimerComponent = forwardRef<HTMLInputElement, InputTimerProps>(
  (
    { startTimer, initialTime, onTimerEnd, resetLabel = 'RESET', onReset, value, ...props },
    ref,
  ) => {
    const [seconds, setSeconds] = useState(initialTime);
    const [timer, timerCounter] = useCounter(0);

    const timerText = timer === 0 ? '' : duration({ seconds }, 'mm:ss').toString();

    useEffect(() => {
      // 0 이라는건 input-timer 최초 로드 했을경우 or 사용하는 곳에서 타이머 정지를 목적으로 0을 설정한 경우
      if (timer === 0) return;

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
    }, [timer, initialTime]); // isTimerActive가 변경될 때마다 실행됨

    useEffect(() => {
      if (startTimer === 0) {
        timerCounter.set(0);
        return;
      }
      timerCounter.inc();
    }, [startTimer]);

    useEffect(() => {
      console.log(value);
    }, [value]);
    const handleReset = () => {
      timerCounter.inc();
      onReset && onReset();
    };

    return (
      <div className={cn(styles.start, styles.input_timer)}>
        <Input {...props} timerText={timerText} className={styles.input_area} />
        <Button className={styles.btn} variant="gray2" size="lg" onClick={() => handleReset()}>
          {resetLabel}
        </Button>
      </div>
    );
  },
);

export const InputTimer = InputTimerComponent;
