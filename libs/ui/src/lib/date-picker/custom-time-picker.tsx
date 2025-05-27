import { ko } from 'date-fns/locale';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';

export const PopoverTimeInput = ({
  value,
  onChange,
  minuteStep = 1,
  secondStep = 1,
  showSeconds = false,
  placeholder = '00:00',
  locale,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const [confirmedTime, setConfirmedTime] = useState<Date | null>(
    value instanceof Date && !isNaN(value.getTime()) ? new Date(value) : null,
  );

  const [tempSelectedTime, setTempSelectedTime] = useState<Date>(
    value instanceof Date && !isNaN(value.getTime()) ? new Date(value) : new Date(),
  );
  const [inputText, setInputText] = useState<string>('');

  const [currentInputStage, setCurrentInputStage] = useState<'hour' | 'minute' | 'second'>('hour');

  const popoverRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isUserInputtingRef = useRef<boolean>(false);
  const isProcessingRef = useRef<boolean>(false);

  const formatTimeWithPadding = (date: Date | null): string => {
    if (!date) return '';
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    if (showSeconds) {
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    if (confirmedTime) {
      setInputText(formatTimeWithPadding(confirmedTime));
    } else {
      setInputText(''); // placeholder 표시를 위해 빈 문자열
    }
  }, []);

  // 시간 텍스트 유효성 검사
  const validateTimeInput = (text: string): boolean => {
    if (!text) return false;

    const regex = showSeconds
      ? /^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/
      : /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;

    return regex.test(text);
  };

  const extractTimeFromText = (text: string) => {
    const parts = text.split(':');
    let hours = null;
    let minutes = null;
    let seconds = null;

    if (parts.length > 0 && parts[0].trim() !== '') {
      const parsed = parseInt(parts[0], 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 23) {
        hours = parsed;
      }
    }

    if (parts.length > 1 && parts[1].trim() !== '') {
      const parsed = parseInt(parts[1], 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 59) {
        minutes = parsed;
      }
    }

    if (showSeconds && parts.length > 2 && parts[2].trim() !== '') {
      const parsed = parseInt(parts[2], 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 59) {
        seconds = parsed;
      }
    }

    return { hours, minutes, seconds };
  };
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isOpen) setIsOpen(true);

    isUserInputtingRef.current = true;

    const newText = e.target.value;

    let inputStage: 'hour' | 'minute' | 'second' = 'hour';

    // 자동 포맷팅 로직 추가
    let formattedText = newText.replace(/[^\d]/g, ''); // 숫자만 추출

    if (showSeconds) {
      // HH:MM:SS 형식
      if (formattedText.length >= 2) {
        formattedText = formattedText.slice(0, 2) + ':' + formattedText.slice(2);
        inputStage = 'minute'; // 2자리 입력 후 분으로 이동
      }
      if (formattedText.length >= 5) {
        formattedText = formattedText.slice(0, 5) + ':' + formattedText.slice(5);
        inputStage = 'second'; // 5자리 입력 후 초로 이동
      }
      if (formattedText.length > 8) {
        formattedText = formattedText.slice(0, 8);
      }
    } else {
      // HH:MM 형식
      if (formattedText.length >= 2) {
        formattedText = formattedText.slice(0, 2) + ':' + formattedText.slice(2);
        inputStage = 'minute'; // 2자리 입력 후 분으로 이동
      }
      if (formattedText.length > 5) {
        formattedText = formattedText.slice(0, 5);
      }
    }

    setInputText(formattedText);

    // 유효한 시간 값이 있으면 UI 업데이트
    const { hours, minutes, seconds } = extractTimeFromText(formattedText);
    if (hours !== null) {
      const newDate = new Date(tempSelectedTime);
      newDate.setHours(hours);

      if (minutes !== null) {
        newDate.setMinutes(minutes);
      } else {
        newDate.setMinutes(0);
      }

      if (showSeconds && seconds !== null) {
        newDate.setSeconds(seconds);
      } else {
        newDate.setSeconds(0);
      }

      setTempSelectedTime(newDate);
      setCurrentInputStage(inputStage);
    }

    setTimeout(() => {
      isUserInputtingRef.current = false;
    }, 100);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const isFullyValid = validateTimeInput(inputText);

      if (isFullyValid) {
        const newDate = parseTimeInput(inputText);
        if (newDate) {
          handleConfirm(newDate);
        }
      } else {
        if (confirmedTime) {
          setInputText(formatTimeWithPadding(confirmedTime));
        } else {
          setInputText('');
        }
      }
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleConfirm = (date: Date) => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    setConfirmedTime(date);
    setInputText(formatTimeWithPadding(date));

    if (onChange) {
      onChange(date);
    }

    setIsOpen(false);

    setTimeout(() => {
      isProcessingRef.current = false;
    }, 100);
  };

  // 취소 버튼 클릭 시 기존 값으로 복원
  const handleCancel = () => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    if (confirmedTime) setTempSelectedTime(new Date(confirmedTime));
    setInputText(formatTimeWithPadding(confirmedTime));
    setIsOpen(false);

    setTimeout(() => {
      isProcessingRef.current = false;
    }, 0);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);

        if (!validateTimeInput(inputText)) {
          if (confirmedTime) {
            setInputText(formatTimeWithPadding(confirmedTime));
            setTempSelectedTime(new Date(confirmedTime));
          } else {
            setInputText('');
          }
        }
      }
    };

    if (isOpen) {
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, inputText, confirmedTime]);

  useEffect(() => {
    if (isOpen && !isProcessingRef.current && !isUserInputtingRef.current) {
      isProcessingRef.current = true;

      setTimeout(() => {
        if (confirmedTime) {
          setTempSelectedTime(new Date(confirmedTime));
        } else {
          setTempSelectedTime(new Date());
        }
        isProcessingRef.current = false;
      }, 0);
    }
  }, [isOpen]);

  // 부모 컴포넌트에서 value가 변경되면 업데이트
  useEffect(() => {
    if (value instanceof Date && !isNaN(value.getTime())) {
      setConfirmedTime(new Date(value));
      setTempSelectedTime(new Date(value));
      setInputText(formatTimeWithPadding(new Date(value)));
    } else if (value === null || value === undefined) {
      setConfirmedTime(null);
      setInputText('');
    }
  }, [value, showSeconds]);

  return (
    <div className="time_wrap" ref={containerRef}>
      <input
        ref={inputRef}
        type="text"
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
        onClick={() => setIsOpen(!isOpen)}
        className="input_time"
      />

      {isOpen && (
        <div ref={popoverRef} className="time_select_wrap">
          <StandaloneTimeInput
            date={tempSelectedTime}
            onChange={handleConfirm}
            minuteStep={minuteStep}
            secondStep={secondStep}
            showSeconds={showSeconds}
            inputStage={currentInputStage}
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
  inputStage,
  locale,
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

  // inputStage prop이 변경되면 selectionStep 업데이트
  useEffect(() => {
    if (inputStage) {
      setSelectionStep(inputStage);
    }
  }, [inputStage]);

  // props로 받은 date가 변경되면 선택값 업데이트
  useEffect(() => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      setSelectedHour(date.getHours());
      setSelectedMinute(date.getMinutes());
      setSelectedSecond(date.getSeconds());

      // 스크롤 위치도 업데이트
      if (hourScrollRef.current) {
        const hourElement = hourScrollRef.current.querySelector(`[data-hour="${date.getHours()}"]`);
        if (hourElement) {
          hourElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      }

      if (minuteScrollRef.current) {
        const minuteElement = minuteScrollRef.current.querySelector(
          `[data-minute="${date.getMinutes()}"]`,
        );
        if (minuteElement) {
          minuteElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      }

      if (showSeconds && secondScrollRef.current) {
        const secondElement = secondScrollRef.current.querySelector(
          `[data-second="${date.getSeconds()}"]`,
        );
        if (secondElement) {
          secondElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      }
    }
  }, [date, showSeconds]);

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

  const handleMinuteClick = (m: number) => {
    setSelectedMinute(m);

    if (showSeconds) {
      setSelectionStep('second');

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
        <div className="hours_area">
          <div className="time_text">{t('시')}</div>
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
                }}
              >
                {formatNumber(h)}
              </div>
            ))}
          </div>
        </div>

        <div className="minutes_area">
          <div className="time_text">{t('분')}</div>
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
            <div className="time_text">{t('초')}</div>
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
