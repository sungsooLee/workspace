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

  // 텍스트 입력 상태를 별도로 관리
  const [inputText, setInputText] = useState<string>('');
  const [isInputValid, setIsInputValid] = useState<boolean>(true);
  const popoverRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // 사용자가 직접 입력 중인지 여부
  const isUserInputtingRef = useRef<boolean>(false);
  // 멈춤 현상 방지를 위한 ref
  const isProcessingRef = useRef<boolean>(false);

  // 필요한 경우 0 패딩을 적용한 포맷팅 (내부 사용)
  const formatTimeWithPadding = (date: Date): string => {
    if (!date) return '';
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    if (showSeconds) {
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }
    return `${hours}:${minutes}`;
  };

  // 시간 텍스트 유효성 검사 - 완전한 형식인 경우만 true 반환
  const validateTimeInput = (text: string): boolean => {
    if (!text) return false;

    // HH:MM 또는 HH:MM:SS 형식인지 정확히 검증
    const regex = showSeconds
      ? /^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/
      : /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;

    return regex.test(text);
  };

  // 텍스트에서 시간 값 추출
  const extractTimeFromText = (text: string) => {
    // 콜론으로 분리
    const parts = text.split(':');
    let hours = null;
    let minutes = null;
    let seconds = null;

    // 시간 부분 파싱 시도
    if (parts.length > 0 && parts[0].trim() !== '') {
      const hoursMatch = parts[0].match(/\d+/);
      if (hoursMatch) {
        const parsed = parseInt(hoursMatch[0], 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 23) {
          hours = parsed;
        }
      }
    }

    // 분 부분 파싱 시도
    if (parts.length > 1 && parts[1].trim() !== '') {
      const minutesMatch = parts[1].match(/\d+/);
      if (minutesMatch) {
        const parsed = parseInt(minutesMatch[0], 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 59) {
          minutes = parsed;
        }
      }
    }

    // 초 부분 파싱 시도
    if (showSeconds && parts.length > 2 && parts[2].trim() !== '') {
      const secondsMatch = parts[2].match(/\d+/);
      if (secondsMatch) {
        const parsed = parseInt(secondsMatch[0], 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 59) {
          seconds = parsed;
        }
      }
    }

    return { hours, minutes, seconds };
  };

  // 텍스트를 Date 객체로 변환
  const parseTimeInput = (text: string): Date | null => {
    if (!text) return null;

    const parts = text.split(':');
    if (parts.length < 2) return null;

    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);

    if (isNaN(hours) || isNaN(minutes)) return null;
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;

    const newDate = new Date(tempSelectedTime);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);

    if (showSeconds && parts.length >= 3) {
      const seconds = parseInt(parts[2], 10);
      if (!isNaN(seconds) && seconds >= 0 && seconds <= 59) {
        newDate.setSeconds(seconds);
      } else {
        newDate.setSeconds(0);
      }
    } else {
      newDate.setSeconds(0);
    }

    return newDate;
  };

  // 초기 텍스트 설정
  useEffect(() => {
    setInputText(formatTimeWithPadding(confirmedTime));
  }, []);

  // 텍스트 입력 처리 함수 - 심플하게 유지
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isOpen) setIsOpen(true);

    // 사용자가 입력 중임을 표시
    isUserInputtingRef.current = true;

    // 입력에서 숫자와 콜론만 허용
    const newText = e.target.value;
    if (!/^[0-9:]*$/.test(newText)) {
      return; // 숫자나 콜론이 아닌 문자는 무시
    }

    // 사용자 입력을 그대로 저장 (자동 포맷팅 없이)
    setInputText(newText);

    // 유효한 시간 값이 있으면 UI 업데이트
    const { hours, minutes, seconds } = extractTimeFromText(newText);
    if (hours !== null && minutes !== null) {
      const newDate = new Date(tempSelectedTime);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);

      if (showSeconds && seconds !== null) {
        newDate.setSeconds(seconds);
      }

      setTempSelectedTime(newDate);
    }

    // 짧은 시간 후 사용자 입력 상태 해제
    setTimeout(() => {
      isUserInputtingRef.current = false;
    }, 100);
  };

  // 엔터 키 처리
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // 완전한 유효성 검사 실행
      const isFullyValid = validateTimeInput(inputText);

      if (isFullyValid) {
        const newDate = parseTimeInput(inputText);
        if (newDate) {
          handleConfirm(newDate);
        }
      } else {
        // 유효하지 않은 값이면 원래 값으로 복원하되, 팝업은 닫지 않음
        setInputText(formatTimeWithPadding(confirmedTime));
        setIsInputValid(true);
      }
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // 입력 필드 포커스 아웃 시
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // 이미 처리 중이면 중복 실행 방지
    if (isProcessingRef.current) return;

    // 클릭된 요소가 popover나 container 내부인지 확인하여 외부 클릭인지 판단
    const isClickOutside =
      (!popoverRef.current || !popoverRef.current.contains(e.relatedTarget as Node)) &&
      (!containerRef.current || !containerRef.current.contains(e.relatedTarget as Node));

    if (isClickOutside) {
      isProcessingRef.current = true;

      // 백그라운드에서 처리하여 UI 차단 방지
      setTimeout(() => {
        // 외부 클릭 시 마지막으로 유효성 체크에 통과한 값으로 세팅
        const isFullyValid = validateTimeInput(inputText);

        if (isFullyValid) {
          // 입력이 유효하다면 해당 값으로 확정
          const newDate = parseTimeInput(inputText);
          if (newDate) {
            handleConfirm(newDate);
          }
        } else {
          // 유효하지 않다면 마지막으로 확정된 시간으로 복원
          setInputText(formatTimeWithPadding(confirmedTime));
          setTempSelectedTime(new Date(confirmedTime));
          setIsInputValid(true);
          setIsOpen(false);
        }

        isProcessingRef.current = false;
      }, 0);
    }
  };

  // UI에서 시간 선택 시 임시 시간 업데이트 및 텍스트 동기화
  const handleTemporaryTimeChange = (date: Date) => {
    // 사용자가 직접 입력 중이면 텍스트 업데이트하지 않음
    if (isProcessingRef.current || isUserInputtingRef.current) return;

    setTempSelectedTime(date);
    setInputText(formatTimeWithPadding(date));
  };

  // 선택 버튼 클릭 시 시간 확정
  const handleConfirm = (date: Date) => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    setConfirmedTime(date);
    // 텍스트 업데이트 (항상 포맷팅된 값으로)
    setInputText(formatTimeWithPadding(date));

    if (onChange) {
      onChange(date);
    }

    setIsOpen(false);
    isProcessingRef.current = false;
  };

  // 취소 버튼 클릭 시 기존 값으로 복원
  const handleCancel = () => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    setTempSelectedTime(new Date(confirmedTime));
    setInputText(formatTimeWithPadding(confirmedTime));
    setIsOpen(false);

    setTimeout(() => {
      isProcessingRef.current = false;
    }, 0);
  };

  // 외부 클릭 감지를 위한 이벤트 리스너 - 성능 최적화
  useEffect(() => {
    // 디바운스 함수 구현
    let timeoutId: NodeJS.Timeout | null = null;

    const handleClickOutside = (event: MouseEvent) => {
      // 이전 타임아웃 취소
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // 디바운스 처리로 중복 실행 방지
      timeoutId = setTimeout(() => {
        if (
          isOpen &&
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          // 입력이 유효하다면 해당 값으로 확정
          if (validateTimeInput(inputText)) {
            const newDate = parseTimeInput(inputText);
            if (newDate) {
              handleConfirm(newDate);
            }
          } else {
            // 유효하지 않다면 마지막으로 확정된 시간으로 복원
            setInputText(formatTimeWithPadding(confirmedTime));
            setTempSelectedTime(new Date(confirmedTime));
            setIsOpen(false);
          }
        }
      }, 50); // 50ms 디바운스
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // 정리 시 타임아웃 취소
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isOpen, inputText, confirmedTime]);

  // 팝오버 열릴 때 임시 값 초기화
  useEffect(() => {
    if (isOpen && !isProcessingRef.current && !isUserInputtingRef.current) {
      isProcessingRef.current = true;

      // 비동기로 실행하여 UI 차단 방지
      setTimeout(() => {
        setTempSelectedTime(new Date(confirmedTime));
        setInputText(formatTimeWithPadding(confirmedTime));
        isProcessingRef.current = false;
      }, 0);
    }
  }, [isOpen]);

  // 부모 컴포넌트에서 value가 변경되면 확정된 시간 업데이트
  useEffect(() => {
    if (
      value instanceof Date &&
      !isNaN(value.getTime()) &&
      !isProcessingRef.current &&
      !isUserInputtingRef.current
    ) {
      isProcessingRef.current = true;

      // 비동기로 실행하여 UI 차단 방지
      setTimeout(() => {
        setConfirmedTime(new Date(value));
        if (!isOpen) {
          setTempSelectedTime(new Date(value));
          setInputText(formatTimeWithPadding(value));
        }
        isProcessingRef.current = false;
      }, 0);
    }
  }, [value, isOpen]);

  return (
    <div className="time_wrap">
      <input
        ref={inputRef}
        type="text"
        value={inputText}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
        readOnly
        onClick={() => setIsOpen(!isOpen)}
        className="input_time"
      />

      {isOpen && (
        <div ref={popoverRef} className="time_select_wrap">
          <StandaloneTimeInput
            date={tempSelectedTime}
            onTempChange={handleTemporaryTimeChange}
            onChange={handleConfirm}
            onCancel={handleCancel}
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
    <div className="vertical_time_selector">
      {/* 시간 선택 영역 */}
      <div className="time_select">
        {/* Hours column */}
        <div className="hours_area">
          <div className="time_text">시</div>
          <div className="column_options">
            {hourOptions.map((h) => (
              <div
                key={`hour-${h}`}
                className={`${h === hours ? 'selected' : ''}`}
                onClick={() => handleHourClick(h)}
                style={{
                  backgroundColor: h === hours ? '#EDFCFF' : 'transparent',
                }}>
                {formatNumber(h)}
              </div>
            ))}
          </div>
        </div>

        {/* Minutes column */}
        <div className="minutes_area">
          <div className="time_text">분</div>
          <div className="column_options">
            {minuteOptions.map((m) => (
              <div
                key={`minute-${m}`}
                className={` ${m === minutes ? 'selected' : ''}`}
                onClick={() => handleMinuteClick(m)}
                style={{
                  backgroundColor: m === minutes ? '#EDFCFF' : 'transparent',
                }}>
                {formatNumber(m)}
              </div>
            ))}
          </div>
        </div>

        {showSeconds && (
          <div className="seconds_area">
            <div className="time_text">초</div>
            <div className="column_options">
              {secondOptions.map((s) => (
                <div
                  key={`second-${s}`}
                  className={` ${s === seconds ? 'selected' : ''}`}
                  onClick={() => handleSecondClick(s)}
                  style={{
                    backgroundColor: s === seconds ? '#EDFCFF' : 'transparent',
                  }}>
                  {formatNumber(s)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="btn_wrap">
        <Button size={'xs'} variant={'gray'} onClick={handleCancel}>
          취소
        </Button>
        <Button size={'xs'} variant={'gray'} onClick={handleConfirm}>
          선택
        </Button>
      </div>
    </div>
  );
};
