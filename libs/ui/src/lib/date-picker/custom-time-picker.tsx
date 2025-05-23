import { useEffect, useRef, useState } from 'react';

export const PopoverTimeInput = ({
  value,
  onChange,
  minuteStep = 1,
  secondStep = 1,
  showSeconds = false,
  placeholder = '00:00',
}: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const [confirmedTime, setConfirmedTime] = useState<Date>(
    value instanceof Date && !isNaN(value.getTime()) ? new Date(value) : new Date(),
  );

  const [tempSelectedTime, setTempSelectedTime] = useState<Date>(
    value instanceof Date && !isNaN(value.getTime()) ? new Date(value) : new Date(),
  );

  const [inputText, setInputText] = useState<string>('');
  const [isInputValid, setIsInputValid] = useState<boolean>(true);
  const popoverRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const isUserInputtingRef = useRef<boolean>(false);
  const isProcessingRef = useRef<boolean>(false);

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
    const handleClickOutside = (event: MouseEvent) => {
      // 클릭한 요소가 컨테이너 외부인지 확인
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        // 팝오버 닫기
        setIsOpen(false);

        // 입력값이 유효하지 않으면 이전 값으로 복원
        if (!validateTimeInput(inputText)) {
          setInputText(formatTimeWithPadding(confirmedTime));
          setTempSelectedTime(new Date(confirmedTime));
        }
      }
    };

    // 이벤트 등록
    if (isOpen) {
      // setTimeout을 사용하여 현재 클릭 이벤트가 완료된 후 리스너 등록
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);
    }

    // 클린업
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
    <div className="time_wrap" ref={containerRef}>
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
  minuteStep = 1,
  secondStep = 1,
  showSeconds = true,
}: any) => {
  const currentDate = date instanceof Date && !isNaN(date.getTime()) ? date : new Date();

  const [selectionStep, setSelectionStep] = useState<'hour' | 'minute' | 'second'>('hour');
  const [selectedHour, setSelectedHour] = useState(currentDate.getHours());
  const [selectedMinute, setSelectedMinute] = useState(currentDate.getMinutes());
  const [selectedSecond, setSelectedSecond] = useState(currentDate.getSeconds());

  const hourScrollRef = useRef<HTMLDivElement>(null);
  const minuteScrollRef = useRef<HTMLDivElement>(null);
  const secondScrollRef = useRef<HTMLDivElement>(null);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  const hourOptions = Array.from({ length: 24 }, (_, i) => i);
  const minuteOptions = Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep);
  const secondOptions = Array.from({ length: 60 / secondStep }, (_, i) => i * secondStep);

  // 시간 선택 시
  const handleHourClick = (h: number) => {
    setSelectedHour(h);
    setSelectionStep('minute');

    // 분 영역으로 자동 스크롤
    setTimeout(() => {
      if (minuteScrollRef.current) {
        const selectedElement = minuteScrollRef.current.querySelector(
          `[data-minute="${selectedMinute}"]`,
        );
        if (selectedElement) {
          selectedElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      }
    }, 100);
  };

  // 분 선택 시
  const handleMinuteClick = (m: number) => {
    setSelectedMinute(m);

    if (showSeconds) {
      setSelectionStep('second');

      // 초 영역으로 자동 스크롤
      setTimeout(() => {
        if (secondScrollRef.current) {
          const selectedElement = secondScrollRef.current.querySelector(
            `[data-second="${selectedSecond}"]`,
          );
          if (selectedElement) {
            selectedElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
          }
        }
      }, 100);
    } else {
      // 초가 없으면 바로 완료
      completeSelection(selectedHour, m, 0);
    }
  };

  // 초 선택 시
  const handleSecondClick = (s: number) => {
    setSelectedSecond(s);
    completeSelection(selectedHour, selectedMinute, s);
  };

  // 선택 완료
  const completeSelection = (h: number, m: number, s: number) => {
    const newDate = new Date(currentDate);
    newDate.setHours(h);
    newDate.setMinutes(m);
    newDate.setSeconds(s);

    if (onChange) {
      onChange(newDate);
    }
  };

  useEffect(() => {
    if (hourScrollRef.current) {
      const hourElement = hourScrollRef.current.querySelector(`[data-hour="${selectedHour}"]`);
      if (hourElement) {
        hourElement.scrollIntoView({ block: 'center', behavior: 'auto' });
      }
    }
  }, []);
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
                data-hour={h}
                className={`time_option ${h === selectedHour ? 'selected' : ''}`}
                onClick={() => handleHourClick(h)}
                style={{
                  backgroundColor: h === selectedHour ? '#EDFCFF' : 'transparent',
                  cursor: selectionStep === 'hour' ? 'pointer' : 'default',
                  // opacity: selectionStep === 'hour' ? 1 : 0.5,
                }}
              >
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
                data-minute={m}
                className={`time_option ${m === selectedMinute ? 'selected' : ''}`}
                onClick={() => selectionStep !== 'hour' && handleMinuteClick(m)}
                style={{
                  backgroundColor: m === selectedMinute ? '#EDFCFF' : 'transparent',
                  cursor: selectionStep === 'minute' ? 'pointer' : 'default',
                  opacity: selectionStep !== 'hour' ? 1 : 0.3,
                }}
              >
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
                  data-second={s}
                  className={`time_option ${s === selectedSecond ? 'selected' : ''}`}
                  onClick={() => selectionStep === 'second' && handleSecondClick(s)}
                  style={{
                    backgroundColor: s === selectedSecond ? '#EDFCFF' : 'transparent',
                    cursor: selectionStep === 'second' ? 'pointer' : 'default',
                    opacity: selectionStep === 'second' ? 1 : 0.3,
                  }}
                >
                  {formatNumber(s)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
