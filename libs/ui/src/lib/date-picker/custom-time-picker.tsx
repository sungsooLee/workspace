import { useEffect, useRef, useState } from 'react';
import { Button } from '../button/button';

export const PopoverTimeInput = ({
  value,
  onChange,
  minuteStep = 1,
  secondStep = 1,
  showSeconds = false,
  placeholder = '00:00',
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  // 실제 확정된 시간 (부모 컴포넌트에 전달된 값)
  const [confirmedTime, setConfirmedTime] = useState<Date>(
    value instanceof Date && !isNaN(value.getTime()) ? new Date(value) : new Date(),
  );
  // 현재 선택 중인 시간 (아직 확정되지 않은 값)
  const [tempSelectedTime, setTempSelectedTime] = useState<Date>(
    value instanceof Date && !isNaN(value.getTime()) ? new Date(value) : new Date(),
  );
  const popoverRef = useRef<HTMLDivElement>(null);

  const formatTime = (date: Date) => {
    if (!date) return '';
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    if (showSeconds) {
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }
    return `${hours}:${minutes}`;
  };

  // 임시 선택 시간 업데이트 (실시간으로 입력창에 반영)
  const handleTemporaryTimeChange = (date: Date) => {
    setTempSelectedTime(date);
  };

  // 선택 버튼 클릭 시 시간 확정
  const handleConfirm = (date: Date) => {
    setConfirmedTime(date);
    if (onChange) {
      onChange(date);
    }
    setIsOpen(false);
  };

  // 취소 버튼 클릭 시 기존 값으로 복원
  const handleCancel = () => {
    // 팝오버 닫기 전에 임시 선택 값을 확정된 값으로 되돌림
    setTempSelectedTime(new Date(confirmedTime));
    setIsOpen(false);
  };

  // 팝오버 열릴 때 임시 값 초기화
  useEffect(() => {
    if (isOpen) {
      setTempSelectedTime(new Date(confirmedTime));
    }
  }, [isOpen, confirmedTime]);

  // 부모 컴포넌트에서 value가 변경되면 확정된 시간 업데이트
  useEffect(() => {
    if (value instanceof Date && !isNaN(value.getTime())) {
      setConfirmedTime(new Date(value));
      if (!isOpen) {
        setTempSelectedTime(new Date(value));
      }
    }
  }, [value, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        handleCancel(); // 외부 클릭 시 취소와 동일하게 처리
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        value={isOpen ? formatTime(tempSelectedTime) : formatTime(confirmedTime)}
        placeholder={placeholder}
        readOnly
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div ref={popoverRef}>
          <StandaloneTimeInput
            date={tempSelectedTime}
            onTempChange={handleTemporaryTimeChange} // 임시 변경 처리 (실시간 업데이트)
            onChange={handleConfirm} // 선택 버튼 클릭 시 호출
            onCancel={handleCancel} // 취소 버튼 클릭 시 호출
            minuteStep={minuteStep}
            secondStep={secondStep}
            showSeconds={showSeconds}
          />
        </div>
      )}
    </div>
  );
};
const StandaloneTimeInput = ({
  date,
  onChange, // 선택 버튼 클릭 시 호출 (최종 확정)
  onTempChange, // 시간 변경 시 실시간 호출 (임시 업데이트)
  onCancel, // 취소 버튼 클릭 시 호출
  minuteStep = 1,
  secondStep = 1,
  showSeconds = true,
}: any) => {
  const now = new Date();
  const currentDate = date instanceof Date && !isNaN(date.getTime()) ? date : now;

  // 내부 상태로 시간 값 관리
  const [hours, setHours] = useState(currentDate.getHours());
  const [minutes, setMinutes] = useState(currentDate.getMinutes());
  const [seconds, setSeconds] = useState(currentDate.getSeconds());

  // Format number to have leading zeros
  const formatNumber = (num: number) => String(num).padStart(2, '0');

  // Generate options for hours, minutes, seconds
  const hourOptions = Array.from({ length: 24 }, (_, i) => i);
  const minuteOptions = Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep);
  const secondOptions = Array.from({ length: 60 / secondStep }, (_, i) => i * secondStep);

  // currentDate가 바뀔 때 내부 상태 업데이트
  useEffect(() => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      setHours(date.getHours());
      setMinutes(date.getMinutes());
      setSeconds(date.getSeconds());
    }
  }, [date]);

  // 시간이 변경될 때마다 임시 변경 함수 호출
  useEffect(() => {
    updateTempTime();
  }, [hours, minutes, seconds]);

  const updateTempTime = () => {
    if (!onTempChange) return;

    const newDate = new Date(currentDate);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    if (showSeconds) {
      newDate.setSeconds(seconds);
    } else {
      newDate.setSeconds(0);
    }

    onTempChange(newDate);
  };

  const handleHourClick = (h: number) => {
    setHours(h);
  };

  const handleMinuteClick = (m: number) => {
    setMinutes(m);
  };

  const handleSecondClick = (s: number) => {
    setSeconds(s);
  };

  // 선택 버튼 클릭 시 부모에게 변경 사항 전달
  const handleConfirm = () => {
    const newDate = new Date(currentDate);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    if (showSeconds) {
      newDate.setSeconds(seconds);
    } else {
      newDate.setSeconds(0);
    }

    if (onChange) {
      onChange(newDate);
    }
  };

  // 취소 버튼 클릭 시 호출
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div
      className="vertical-time-selector"
      style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* 시간 선택 영역 */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {/* Hours column */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div>시</div>
          <div
            className="column-options"
            style={{
              height: '200px',
              overflowY: 'auto',
            }}>
            {hourOptions.map((h) => (
              <div
                key={`hour-${h}`}
                className={`${h === hours ? 'selected' : ''}`}
                onClick={() => handleHourClick(h)}
                style={{
                  backgroundColor: h === hours ? '#e6f7ff' : 'transparent',
                }}>
                {formatNumber(h)}
              </div>
            ))}
          </div>
        </div>

        {/* Minutes column */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div>분</div>
          <div
            className="column-options"
            style={{
              height: '200px',
              overflowY: 'auto',
            }}>
            {minuteOptions.map((m) => (
              <div
                key={`minute-${m}`}
                className={` ${m === minutes ? 'selected' : ''}`}
                onClick={() => handleMinuteClick(m)}
                style={{
                  backgroundColor: m === minutes ? '#e6f7ff' : 'transparent',
                }}>
                {formatNumber(m)}
              </div>
            ))}
          </div>
        </div>

        {showSeconds && (
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div>초</div>
            <div
              style={{
                height: '200px',
                overflowY: 'auto',
              }}>
              {secondOptions.map((s) => (
                <div
                  key={`second-${s}`}
                  className={` ${s === seconds ? 'selected' : ''}`}
                  onClick={() => handleSecondClick(s)}
                  style={{
                    backgroundColor: s === seconds ? '#e6f7ff' : 'transparent',
                  }}>
                  {formatNumber(s)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <Button onClick={handleCancel}>취소</Button>
        <Button onClick={handleConfirm}>선택</Button>
      </div>
    </div>
  );
};
