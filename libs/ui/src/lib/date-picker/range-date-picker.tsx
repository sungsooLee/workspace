import { IcoCalendar01 } from '@learnway/icons';
import { cn, getDatePickerPlaceholder, getDefaultLang } from '@learnway/shared';
import { enUS, ko } from 'date-fns/locale';
import { forwardRef, ForwardRefRenderFunction, useEffect, useRef, useState } from 'react';
import Primitive from 'react-datepicker';
import { Locale } from 'react-datepicker/dist/date_utils';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useModalStore } from '../stores/useModalStore';
import { BaseFieldProps } from '../type';
import { CustomDatePickerHeader } from './custom-date-picker-header';
import { PopoverHourInput } from './custom-hour-picker';
import { PopoverTimeInput } from './custom-time-picker';
import { DatePickerType } from './date-picker';
import './date-picker.css';

const dayjsToDateFnsLocaleMap: Record<string, any> = {
  ko,
  en: enUS,
};

export interface RangeDatePickerProps extends BaseFieldProps<{ from?: Date; to?: Date }> {
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  className?: string;
  readOnly?: boolean;
  disabled?: boolean;
  size?: 'md' | 'lg';
  onChange?: (value: { from?: Date; to?: Date }) => void;
  onChangeStart?: (date: Date | undefined) => void;
  onChangeEnd?: (date: Date | undefined) => void;
  placeholderStart?: string;
  placeholderEnd?: string;
  locale?: string;
  displayType?: DatePickerType;
  minuteStep?: number;
  secondStep?: number;
}

const RangeDatePickerComponent: ForwardRefRenderFunction<HTMLDivElement, RangeDatePickerProps> = (
  {
    value,
    onChange,
    minDate,
    maxDate,
    disabledDates,
    className,
    readOnly,
    disabled,
    size,
    onChangeStart,
    onChangeEnd,
    locale,
    displayType = 'day',
    minuteStep = 1,
    secondStep = 1,
  },
  ref,
) => {
  const { i18n } = useTranslation();
  const { modals } = useModalStore();

  const [currentLocale, setCurrentLocale] = useState<Locale>(() => {
    const targetLocale = locale || i18n.language || getDefaultLang();
    return dayjsToDateFnsLocaleMap[targetLocale] || ko;
  });

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      if (!locale) {
        const newLocale = dayjsToDateFnsLocaleMap[lng] || ko;
        setCurrentLocale(newLocale);
      }
    };

    if (i18n) {
      if (!locale) {
        const newLocale = dayjsToDateFnsLocaleMap[i18n.language] || ko;
        setCurrentLocale(newLocale);
      }

      i18n.on('languageChanged', handleLanguageChange);

      return () => {
        i18n.off('languageChanged', handleLanguageChange);
      };
    }
  }, [i18n, locale]);

  const [startDate, setStartDate] = useState<Date | undefined>(value?.from ?? undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(value?.to ?? undefined);

  const [isKeyboardInput, setIsKeyboardInput] = useState(false);

  const startPickerRef = useRef<any>(null);
  const endPickerRef = useRef<any>(null);

  useEffect(() => {
    setStartDate(value?.from);
    setEndDate(value?.to);
  }, [value]);

  const getPlaceholderByType = (type: any, locale: any) => {
    const localeString = locale === ko ? 'ko' : 'en';
    return getDatePickerPlaceholder(type, localeString);
  };

  // 시작일 변경 핸들러
  const handleStartDateChange = (date: Date | null) => {
    if (readOnly || disabled) return;
    if (!date) {
      setStartDate(undefined);
      setEndDate(undefined);
      onChange?.({ from: undefined, to: undefined });
      onChangeStart?.(undefined);
      onChangeEnd?.(undefined);
      return;
    }

    if (!endDate || date > endDate) {
      setStartDate(date);
      setEndDate(undefined);
      onChange?.({ from: date, to: undefined });

      if (!isKeyboardInput && !isTimeOnlyMode) {
        setTimeout(() => {
          endPickerRef.current?.setOpen(true);
        }, 100);
      }
    } else {
      setStartDate(date);
      onChange?.({ from: date, to: endDate });
    }

    onChangeStart?.(date || undefined);
    setIsKeyboardInput(false);
  };

  // 종료일 변경 핸들러
  const handleEndDateChange = (date: Date | null) => {
    if (readOnly || disabled) return;
    if (!date) {
      setEndDate(undefined);
      onChange?.({ from: startDate, to: undefined });
      onChangeEnd?.(undefined);
      return;
    }

    if (!startDate || date < startDate) {
      setStartDate(date);
      setEndDate(undefined);
      onChange?.({ from: startDate, to: undefined });

      if (!isKeyboardInput && !isTimeOnlyMode) {
        setTimeout(() => {
          endPickerRef.current?.setOpen(true);
        }, 100);
      }
    } else {
      setEndDate(date);
      onChange?.({ from: startDate, to: date });
    }

    onChangeEnd?.(date || undefined);
    setIsKeyboardInput(false);
  };

  // 키보드 입력 감지 핸들러
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const inputKeys = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '-',
      '/',
      'Backspace',
      'Delete',
    ];
    if (inputKeys.includes(e.key) || e.key.length === 1) {
      setIsKeyboardInput(true);
    }
  };

  const dateFormat = currentLocale === ko ? 'yyyy-MM-dd' : 'MM-dd-yyyy';
  const showHourPicker = displayType === 'day-time-h';
  const showTimePicker =
    displayType === 'time' ||
    displayType === 'time-hm' ||
    displayType === 'day-time' ||
    displayType === 'day-time-hm' ||
    displayType === 'day-time-hms';
  const showTimeStep = displayType === 'time-step';
  const isTimeOnlyMode = showHourPicker || showTimePicker || showTimeStep;
  const showSeconds = displayType === 'day-time-hms' || displayType === 'time';

  return (
    <div className={cn('nlp--datepicker-time', 'nlp--datepicker-from-to', size)} ref={ref}>
      <div className="nlp--datepicker-calendar">
        <Primitive
          ref={startPickerRef}
          showIcon
          selectsStart
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          dateFormat={dateFormat}
          shouldCloseOnSelect={true}
          readOnly={readOnly}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText={getPlaceholderByType('day', currentLocale)}
          icon={<IcoCalendar01 width={16} height={16} stroke="#4C515E" fill="none" />}
          isClearable={true}
          wrapperClassName={'datepicker_wrap'}
          className={cn('datepicker_input', className)}
          onChange={handleStartDateChange}
          onKeyDown={handleKeyDown}
          excludeDates={disabledDates}
          renderDayContents={(day) => {
            return <span className="date_text">{day}</span>;
          }}
          renderCustomHeader={(headerProps: any) => (
            <CustomDatePickerHeader {...headerProps} locale={currentLocale} />
          )}
          locale={currentLocale}
          popperPlacement="bottom-start"
          popperContainer={
            modals.length
              ? undefined
              : (props) => ReactDOM.createPortal(props.children, document.body)
          }
        />
        {showHourPicker && (
          <div className="nlp--datepicker-time">
            <PopoverHourInput
              value={startDate}
              onChange={(date: Date | undefined) => {
                if (date) {
                  handleStartDateChange(date);
                }
              }}
              placeholder={getPlaceholderByType('time-h', currentLocale)}
              locale={currentLocale}
            />
          </div>
        )}
        {showTimePicker && (
          <div className="nlp--datepicker-time">
            <PopoverTimeInput
              value={startDate}
              onChange={(date: Date | undefined) => {
                if (date) {
                  handleStartDateChange(date);
                }
              }}
              minuteStep={minuteStep}
              secondStep={secondStep}
              showSeconds={showSeconds}
              placeholder={getPlaceholderByType('time-hm', currentLocale)}
              locale={currentLocale}
            />
          </div>
        )}
        {showTimeStep && (
          <div className={cn('nlp--datepicker-time', 'time_step')}>
            <Primitive
              showIcon
              shouldCloseOnSelect
              readOnly={readOnly}
              disabled={disabled}
              showTimeSelect
              showTimeSelectOnly
              selected={startDate}
              placeholderText={getPlaceholderByType('time-step', currentLocale)}
              // icon={<IcoCalendar01 width={16} height={16} stroke="#4C515E" fill="none" />}
              isClearable={true}
              dateFormat={currentLocale === ko ? 'aa h:mm' : 'h:mm aa'}
              timeFormat={currentLocale === ko ? 'aa h:mm' : 'h:mm aa'}
              wrapperClassName={'datepicker_wrap'}
              className={cn('datepicker_input', className)}
              onChange={handleStartDateChange}
              excludeDates={disabledDates}
              locale={currentLocale}
              timeIntervals={minuteStep}
              timeCaption=""
              popperPlacement="bottom-start"
              popperContainer={
                modals.length
                  ? undefined
                  : (props) => ReactDOM.createPortal(props.children, document.body)
              }
            />
          </div>
        )}
      </div>
      <span className="hyphen"></span>
      <div className="nlp--datepicker-calendar">
        <Primitive
          ref={endPickerRef}
          showIcon
          selectsEnd
          selected={endDate}
          startDate={startDate}
          endDate={endDate}
          dateFormat={dateFormat}
          shouldCloseOnSelect={true}
          readOnly={readOnly}
          disabled={disabled}
          minDate={startDate || minDate}
          maxDate={maxDate}
          placeholderText={getPlaceholderByType('day', currentLocale)}
          icon={<IcoCalendar01 width={16} height={16} stroke="#4C515E" fill="none" />}
          isClearable={true}
          wrapperClassName={'datepicker_wrap'}
          className={cn('datepicker_input', className)}
          onChange={handleEndDateChange}
          onKeyDown={handleKeyDown}
          excludeDates={disabledDates}
          renderDayContents={(day) => {
            return <span className="date_text">{day}</span>;
          }}
          renderCustomHeader={(headerProps: any) => (
            <CustomDatePickerHeader {...headerProps} locale={currentLocale} />
          )}
          locale={currentLocale}
          popperPlacement="bottom-start"
          popperContainer={
            modals.length
              ? undefined
              : (props) => ReactDOM.createPortal(props.children, document.body)
          }
        />
        {showHourPicker && (
          <div className="nlp--datepicker-time">
            <PopoverHourInput
              value={endDate}
              onChange={(date: Date | undefined) => {
                if (date) {
                  handleEndDateChange(date);
                }
              }}
              placeholder={getPlaceholderByType('time-h', currentLocale)}
              locale={currentLocale}
            />
          </div>
        )}
        {showTimePicker && (
          <div className="nlp--datepicker-time">
            <PopoverTimeInput
              value={endDate}
              onChange={(date: Date | undefined) => {
                if (date) {
                  handleEndDateChange(date);
                }
              }}
              minuteStep={minuteStep}
              secondStep={secondStep}
              showSeconds={showSeconds}
              placeholder={getPlaceholderByType('time-hm', currentLocale)}
              locale={currentLocale}
            />
          </div>
        )}
        {showTimeStep && (
          <div className={cn('nlp--datepicker-time', 'time_step')}>
            <Primitive
              showIcon
              shouldCloseOnSelect
              readOnly={readOnly}
              disabled={disabled}
              showTimeSelect
              showTimeSelectOnly
              selected={endDate}
              placeholderText={getPlaceholderByType('time-step', currentLocale)}
              // icon={<IcoClock01 width={16} height={16} stroke="#5C636E" fill="none" />}
              isClearable={true}
              dateFormat={currentLocale === ko ? 'aa h:mm' : 'h:mm aa'}
              timeFormat={currentLocale === ko ? 'aa h:mm' : 'h:mm aa'}
              wrapperClassName={'datepicker_wrap'}
              className={cn('datepicker_input', className)}
              onChange={handleEndDateChange}
              excludeDates={disabledDates}
              locale={currentLocale}
              timeIntervals={minuteStep}
              timeCaption=""
              popperPlacement="bottom-start"
              popperContainer={
                modals.length
                  ? undefined
                  : (props) => ReactDOM.createPortal(props.children, document.body)
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const RangeDatePicker = forwardRef<HTMLDivElement, RangeDatePickerProps>(
  RangeDatePickerComponent,
);
