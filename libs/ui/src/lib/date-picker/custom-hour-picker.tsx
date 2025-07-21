import { ko } from 'date-fns/locale';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { Popover } from '../popover/popover';

export const PopoverHourInput = ({ value, onChange, placeholder = '00', locale }: any) => {
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
    return `${hours}`;
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

    const regex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;

    return regex.test(text);
  };

  const extractTimeFromText = (text: string) => {
    const parts = text.split(':');
    let hours = null;

    if (parts.length > 0 && parts[0].trim() !== '') {
      const parsed = parseInt(parts[0], 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 23) {
        hours = parsed;
      }
    }

    return { hours };
  };
  const parseTimeInput = (text: string): Date | null => {
    if (!text) return null;

    const parts = text.split(':');
    if (parts.length < 2) return null;

    const hours = parseInt(parts[0], 10);

    if (isNaN(hours)) return null;
    if (hours < 0 || hours > 23) return null;

    const newDate = new Date(tempSelectedTime);
    newDate.setHours(hours);
    newDate.setMinutes(0);
    newDate.setSeconds(0);

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
    inputStage = 'hour'; // 2자리 입력 후 분으로 이동

    let formattedText = newText.replace(/[^\d]/g, ''); // 숫자만 추출

    if (formattedText.length > 2) {
      formattedText = formattedText.slice(2);
    }

    setInputText(formattedText);

    // 유효한 시간 값이 있으면 UI 업데이트
    const { hours } = extractTimeFromText(formattedText);
    if (hours !== null) {
      const newDate = new Date(tempSelectedTime);
      newDate.setHours(hours);
      newDate.setMinutes(0);
      newDate.setSeconds(0);

      setTempSelectedTime(newDate);
      setCurrentInputStage(inputStage);
    }

    setTimeout(() => {
      isUserInputtingRef.current = false;
    }, 100);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newDate = new Date(tempSelectedTime);
      newDate.setHours(parseInt(inputText));
      newDate.setMinutes(0);
      newDate.setSeconds(0);
      handleConfirm(newDate);
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
  }, [value]);

  return (
    <Popover
      popoverContent={
        <div ref={popoverRef} className="time_select_wrap">
          <StandaloneTimeInput
            date={tempSelectedTime}
            onChange={handleConfirm}
            inputStage={currentInputStage}
            locale={locale}
          />
        </div>
      }
    >
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

        {/* {isOpen && (
            <div ref={popoverRef} className="time_select_wrap">
              <StandaloneTimeInput
                date={tempSelectedTime}
                onChange={handleConfirm}
                minuteStep={minuteStep}
                secondStep={secondStep}
                onlyHour={onlyHour}
                showSeconds={showSeconds}
                inputStage={currentInputStage}
                locale={locale}
              />
            </div>
          )} */}
      </div>
    </Popover>
  );
};

const StandaloneTimeInput = ({
  date,
  onChange, // 선택 버튼 클릭 시 호출 (최종 확정)
  inputStage,
  locale,
}: any) => {
  const currentDate = date instanceof Date && !isNaN(date.getTime()) ? date : new Date();

  const [selectionStep, setSelectionStep] = useState<'hour' | 'minute' | 'second'>('hour');
  const [selectedHour, setSelectedHour] = useState(currentDate.getHours());

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  const hourOptions = Array.from({ length: 24 }, (_, i) => i);

  const hourOptionsRefs = useRef<(HTMLDivElement | null)[]>([]); // 시 Item Ref - 스크롤 처리

  // 시 - 스크롤 처리
  const scrollToHour = (index: number) => {
    hourOptionsRefs.current?.[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

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
      // 초기 스크롤 위치
      scrollToHour(date.getHours());
    }
  }, [date]);

  // 시간 선택 시
  const handleHourClick = (h: number) => {
    setSelectedHour(h);
    completeSelection(h, 0, 0);
    scrollToHour(h);
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
  return (
    <div className="vertical_time_selector">
      {/* 시간 선택 영역 */}
      <div className="time_select">
        <div className="hours_area">
          <div className="time_text">{locale === ko ? t('시') : t('Hour')}</div>
          <div className="column_options">
            {hourOptions.map((h, i) => (
              <Popover.Close asChild>
                <div
                  ref={(ref) => (hourOptionsRefs.current[i] = ref)}
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
              </Popover.Close>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
