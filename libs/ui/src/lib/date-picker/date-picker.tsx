import { forwardRef, useEffect, useState, ForwardRefRenderFunction } from 'react';
import Primitive from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.css';
import { IcoCalendar01 } from '@learnway/icons';
import {
  cn,
  DATE_TIME_FORMAT,
  getDatePickerPlaceholder,
  getDateTimeFormat,
  getDefaultLang,
} from '@learnway/shared';
import { BaseFieldProps } from '../type';
import { useCreation } from 'ahooks';
import { convertDateFormatToFns } from './date-picker.service';
import { PopoverTimeInput } from './custom-time-picker';
import { ReactNode } from '@tanstack/react-router';
import { CustomDatePickerHeader } from './custom-date-picker-header';
import { ko, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { Locale } from 'react-datepicker/dist/date_utils';

export const convertDateFormatToFnsWithSlash = (format: string): string => {
  return format.replace(/-/g, '/');
};
const dayjsToDateFnsLocaleMap: Record<string, any> = {
  // 한국어
  ko: ko,
  // 영어
  en: enUS,
};

export type DatePickerType =
  | 'day'
  | 'year'
  | 'month'
  | 'time-step'
  | 'time'
  | 'time-hm'
  | 'day-time'
  | 'day-time-hm'
  | 'day-time-hms'; // 팝오버 스타일의 시간 선택기 컴포넌트

export interface DatePickerComponentProps extends BaseFieldProps<Date> {
  displayType?: DatePickerType;
  dateTimeFormat?: DATE_TIME_FORMAT;
  minDate?: Date;
  maxDate?: Date;
  selected?: Date;
  disabledDates?: Date[];
  timeFormat?: '12' | '24';
  numberOfMonths?: number;
  minuteStep?: number;
  secondStep?: number;
  showTimePicker?: boolean;
  showTimeSelectOnly?: boolean;
  className?: string;
  readOnly?: boolean;
  disabled?: boolean;
  size?: 'md' | 'lg';
  onChange?: (date: Date | undefined) => void;
  renderDayContents?: ReactNode;
  locale?: string;
}

// DatePicker 컴포넌트 정의
const DatePickerComponent: ForwardRefRenderFunction<HTMLDivElement, DatePickerComponentProps> = (
  {
    displayType = 'day',
    dateTimeFormat = DATE_TIME_FORMAT.DATE,
    value,
    onChange,
    placeholder,
    minDate,
    maxDate,
    selected,
    disabledDates,
    numberOfMonths = 1,
    showTimePicker = false,
    timeFormat = '24',
    minuteStep = 1,
    secondStep = 1,
    className,
    readOnly,
    disabled,
    size,
    locale,
  },
  ref,
) => {
  const { i18n } = useTranslation(); // 추가

  // currentLocale 상태 관리 수정
  const [currentLocale, setCurrentLocale] = useState<Locale>(() => {
    // locale prop이 있으면 우선 사용, 없으면 i18n 언어 사용
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
      // 현재 언어로 초기화
      if (!locale) {
        const newLocale = dayjsToDateFnsLocaleMap[i18n.language] || ko;
        setCurrentLocale(newLocale);
      }

      // 언어 변경 이벤트 리스너 등록
      i18n.on('languageChanged', handleLanguageChange);

      return () => {
        i18n.off('languageChanged', handleLanguageChange);
      };
    }
  }, [i18n, locale]);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => {
    // time 타입일 때는 value가 없으면 undefined 유지
    if ((displayType === 'time' || displayType === 'time-hm') && !value) {
      return undefined;
    }
    return value as Date | undefined;
  });

  // DateFormat을 가지고옴.
  const dateFormat = useCreation(() => {
    let format = dateTimeFormat;
    const type = displayType;
    if (type === 'year') {
      format = DATE_TIME_FORMAT.YEAR;
    } else if (type === 'month') {
      format = DATE_TIME_FORMAT.MONTH;
    } else if (type === 'day') {
      format = DATE_TIME_FORMAT.DATE;
    } else if (type === 'time') {
      format = DATE_TIME_FORMAT.HOUR_MIN;
    } else if (type === 'time-hm') {
      format = DATE_TIME_FORMAT.HOUR_MIN;
    } else if (type === 'day-time') {
      format = DATE_TIME_FORMAT.DATETIME_HOUR;
    } else if (type === 'day-time-hm') {
      format = DATE_TIME_FORMAT.DATETIME_MIN;
    } else if (type === 'day-time-hms') {
      format = DATE_TIME_FORMAT.DATETIME_SEC;
    }
    const localeString = currentLocale === ko ? 'ko' : 'en';

    const dayjsFormat = getDateTimeFormat(format, localeString);
    const fnsFormat = convertDateFormatToFns(dayjsFormat);

    // 영어 locale에서 슬래시를 사용하는 경우, react-datepicker가 제대로 파싱하도록 수정
    console.log(fnsFormat, currentLocale);
    return fnsFormat;
  }, [dateTimeFormat, displayType, currentLocale]);

  const parseDateFormat = useCreation(() => {
    if (dateFormat.includes('/')) {
      return dateFormat.replace(/\//g, '-');
    }
    return dateFormat;
  }, [dateFormat]);

  const handleChange = (date: Date | string | null) => {
    if (readOnly || disabled) return;
    let parsedDate: Date | undefined;

    if (typeof date === 'string') {
      const normalizedDate = date.replace(/-/g, '/');
      parsedDate = new Date(normalizedDate);
      if (isNaN(parsedDate.getTime())) {
        parsedDate = undefined;
      }
    } else {
      parsedDate = date || undefined;
    }

    setSelectedDate(parsedDate);

    if (onChange) {
      onChange(parsedDate);
    }
  };

  const handleTimeStepChange = (date: Date | null) => {
    if (date) {
      if (selectedDate) {
        const newDate = new Date(selectedDate);
        newDate.setHours(date.getHours(), date.getMinutes(), 0, 0);
        setSelectedDate(newDate);
        onChange?.(newDate);
      } else {
        // 선택된 날짜가 없으면 오늘 날짜로 설정
        const today = new Date();
        today.setHours(date.getHours(), date.getMinutes(), 0, 0);
        setSelectedDate(today);
        onChange?.(today);
      }
    } else {
      setSelectedDate(undefined);
      onChange?.(undefined);
    }
  };

  const handleCustomTimeInput = (event: any) => {
    const input = event.target.value;

    // 한국어 처리
    if (currentLocale === ko) {
      const match = input.match(/^(\d{1,2}):(\d{2})$/);
      if (match) {
        const hours = parseInt(match[1]);
        const minutes = parseInt(match[2]);

        if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
          // 기존 날짜 유지하면서 시간만 변경
          const date = selectedDate ? new Date(selectedDate) : new Date();
          date.setHours(hours, minutes, 0, 0);
          handleTimeStepChange(date);

          // 입력 필드 값을 포맷된 형식으로 업데이트
          const ampm = hours >= 12 ? '오후' : '오전';
          const displayHours = hours % 12 || 12;
          event.target.value = `${ampm} ${displayHours}:${String(minutes).padStart(2, '0')}`;
        }
      }
    }
    // 영어 처리
    else {
      // "2:30 PM" 또는 "14:30" 형식 처리
      // 12시간 형식
      const match12h = input.match(/^(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)$/i);
      if (match12h) {
        let hours = parseInt(match12h[1]);
        const minutes = parseInt(match12h[2]);
        const ampm = match12h[3].toUpperCase();

        // 12시간을 24시간으로 변환
        if (ampm === 'PM' && hours !== 12) hours += 12;
        if (ampm === 'AM' && hours === 12) hours = 0;

        if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
          const date = selectedDate ? new Date(selectedDate) : new Date();
          date.setHours(hours, minutes, 0, 0);
          handleTimeStepChange(date);
        }
      }
      // 24시간 형식
      else {
        const match24h = input.match(/^(\d{1,2}):(\d{2})$/);
        if (match24h) {
          const hours = parseInt(match24h[1]);
          const minutes = parseInt(match24h[2]);

          if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
            const date = selectedDate ? new Date(selectedDate) : new Date();
            date.setHours(hours, minutes, 0, 0);
            handleTimeStepChange(date);

            // 24시간 입력을 12시간 형식으로 변환하여 표시
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;
            event.target.value = `${displayHours}:${String(minutes).padStart(2, '0')} ${ampm}`;
          }
        }
      }
    }
  };
  useEffect(() => {
    console.log(value);
    setSelectedDate(value as Date | undefined);
  }, [value]);

  const getPlaceholderByType = (type: any, locale: any) => {
    const localeString = locale === ko ? 'ko' : 'en';
    return getDatePickerPlaceholder(type, localeString);
  };

  // 시간만 선택하는 경우(time, time-hm)
  if (displayType === 'time' || displayType === 'time-hm') {
    const showSeconds = displayType === 'time-hm';

    return (
      <div className={cn('nlp--datepicker-wrap', 'nlp--datepicker-time-hm', size)} ref={ref}>
        <PopoverTimeInput
          value={selectedDate}
          onChange={handleChange}
          minuteStep={minuteStep}
          secondStep={secondStep}
          showSeconds={showSeconds}
          locale={currentLocale}
          placeholder={
            showSeconds
              ? getPlaceholderByType('time', currentLocale)
              : getPlaceholderByType('time-hm', currentLocale)
          }
        />
      </div>
    );
  }

  // Date Picker 라이브러리에서 제공하는 기본 시간 포맷 입력
  if (displayType === 'time-step') {
    return (
      <div className={cn('nlp--datepicker-wrap', 'nlp--datepicker-time-hm', size)} ref={ref}>
        <Primitive
          showIcon
          shouldCloseOnSelect
          readOnly={readOnly}
          disabled={disabled}
          showTimeSelect
          showTimeSelectOnly
          selected={selectedDate}
          placeholderText={getPlaceholderByType('time-step', currentLocale)}
          icon={<IcoCalendar01 width={16} height={16} stroke="#4  C515E" fill="none" />}
          isClearable={true}
          dateFormat={currentLocale === ko ? 'aa h:mm' : 'h:mm aa'}
          timeFormat={currentLocale === ko ? 'aa h:mm' : 'h:mm aa'}
          // dateFormat={currentLocale === ko ? 'aa h시' : 'h:mm aa'}
          // timeFormat={currentLocale === ko ? 'aa h시' : 'h:mm aa'}
          wrapperClassName={'datepicker_wrap'}
          className={cn('datepicker_input', className)}
          onChange={handleTimeStepChange}
          onChangeRaw={handleCustomTimeInput}
          excludeDates={disabledDates}
          locale={currentLocale}
          timeIntervals={minuteStep}
          timeCaption=""
        />
      </div>
    );
  }

  // 3. Year picker
  if (displayType === 'year') {
    const currentYear = new Date().getFullYear();

    const baseYear = selectedDate ? selectedDate.getFullYear() : currentYear;

    return (
      <div className={cn('nlp--datepicker', 'nlp--datepicker-year', size)} ref={ref}>
        <Primitive
          showIcon
          dateFormat={dateFormat}
          shouldCloseOnSelect
          readOnly={readOnly}
          disabled={disabled}
          // minDate={new Date(startYear, 0, 1)}
          // maxDate={new Date(startYear + 15, 11, 31)}
          // selected={selectedDate}
          // placeholderText={placeholder}
          icon={<IcoCalendar01 width={16} height={16} stroke="#4C515E" fill="none" />}
          isClearable={true}
          showYearPicker
          scrollableYearDropdown
          yearItemNumber={12}
          monthsShown={numberOfMonths}
          wrapperClassName={'datepicker_wrap'}
          className={cn('datepicker_input', className)}
          onChange={handleChange}
          excludeDates={disabledDates}
          locale={currentLocale}
          renderYearContent={(year: number) => {
            const isCurrentYear = year === currentYear;
            return <span className={isCurrentYear ? 'current-year' : ''}>{year}</span>;
          }}
          selected={selectedDate}
          placeholderText={getPlaceholderByType('year', currentLocale)}
        />
        {/* <CustomYearPicker selectedDate={selectedDate} onChange={handleChange} /> */}
      </div>
    );
  }

  // 4. Month picker
  if (displayType === 'month') {
    return (
      <div className={cn('nlp--datepicker', 'nlp--datepicker-month', size)} ref={ref}>
        <Primitive
          showIcon
          dateFormat={dateFormat}
          shouldCloseOnSelect
          readOnly={readOnly}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          selected={selectedDate}
          placeholderText={getPlaceholderByType('month', currentLocale)}
          icon={<IcoCalendar01 width={16} height={16} stroke="#4C515E" fill="none" />}
          isClearable={true}
          showMonthYearPicker
          monthsShown={numberOfMonths}
          wrapperClassName={'datepicker_wrap'}
          className={cn('datepicker_input', className)}
          onChange={handleChange}
          excludeDates={disabledDates}
          locale={currentLocale}
          renderCustomHeader={(headerProps: any) => (
            <CustomDatePickerHeader {...headerProps} locale={currentLocale} type={'year'} />
          )}
        />
      </div>
    );
  }

  // 5. Day/Time combinations
  if (
    displayType === 'day-time' ||
    displayType === 'day-time-hm' ||
    displayType === 'day-time-hms'
  ) {
    const showSeconds = displayType === 'day-time-hms';

    return (
      <div className={cn('nlp--datepicker-time-wrap', size)} ref={ref}>
        {/* Date component */}
        <div className="nlp--datepicker-calendar">
          <Primitive
            showIcon
            dateFormat="yyyy-MM-dd"
            shouldCloseOnSelect
            readOnly={readOnly}
            disabled={disabled}
            minDate={minDate}
            maxDate={maxDate}
            selected={selectedDate}
            placeholderText={getPlaceholderByType('day', currentLocale)}
            icon={<IcoCalendar01 width={16} height={16} stroke="#4C515E" fill="none" />}
            isClearable={true}
            monthsShown={numberOfMonths}
            wrapperClassName={'datepicker_wrap'}
            onChange={handleChange}
            excludeDates={disabledDates}
            renderCustomHeader={(headerProps: any) => (
              <CustomDatePickerHeader {...headerProps} locale={currentLocale} />
            )}
            locale={currentLocale}
          />
        </div>

        {/* Time component */}
        <div className="nlp--datepicker-time">
          <PopoverTimeInput
            value={selectedDate}
            onChange={handleChange}
            minuteStep={minuteStep}
            secondStep={secondStep}
            showSeconds={showSeconds}
            placeholder={
              showSeconds
                ? getPlaceholderByType('time', currentLocale)
                : getPlaceholderByType('time-hm', currentLocale)
            }
          />
        </div>
      </div>
    );
  }

  // 6. Default day picker
  return (
    <div className={cn('nlp--datepicker-time', size)} ref={ref}>
      <Primitive
        showIcon
        dateFormat={dateFormat}
        dateFormatCalendar={parseDateFormat}
        shouldCloseOnSelect
        readOnly={readOnly}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        selected={selectedDate}
        placeholderText={getPlaceholderByType('day', currentLocale)}
        icon={<IcoCalendar01 width={16} height={16} stroke="#4C515E" fill="none" />}
        isClearable={true}
        monthsShown={numberOfMonths}
        wrapperClassName={'datepicker_wrap'}
        className={cn('datepicker_input', className)}
        onChange={handleChange}
        excludeDates={disabledDates}
        renderCustomHeader={(headerProps: any) => (
          <CustomDatePickerHeader {...headerProps} locale={currentLocale} />
        )}
        locale={currentLocale}
        // placeholderText={dynamicPlaceholder}
      />
    </div>
  );
};

export const DatePicker = forwardRef<HTMLDivElement, DatePickerComponentProps>(DatePickerComponent);
