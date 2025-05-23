import { forwardRef, useEffect, useState, ForwardRefRenderFunction, useRef } from 'react';
import Primitive from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.css'; // date-picker style
import { IcoCalendar01 } from '@learnway/icons';

import { cn, DATE_TIME_FORMAT, getDateTimeFormat, getDefaultLang } from '@learnway/shared';
import { BaseFieldProps } from '../type';
import { useCreation } from 'ahooks';

import { convertDateFormatToFns } from './date-picker.service';
import { PopoverTimeInput } from './custom-time-picker';
import { ReactNode } from '@tanstack/react-router';
import { CustomDatePickerHeader } from './custom-date-picker-header';
import { ko, enUS } from 'date-fns/locale';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

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
  | 'from-to'
  | 'time'
  | 'time-hm'
  | 'day-time'
  | 'day-time-hm'
  | 'day-time-hms'; // 팝오버 스타일의 시간 선택기 컴포넌트

export interface DatePickerComponentProps
  extends BaseFieldProps<Date | [Date | null, Date | null]> {
  displayType?: DatePickerType;
  dateTimeFormat?: DATE_TIME_FORMAT;
  minDate?: Date;
  maxDate?: Date;
  selected?: Date;
  disabledDates?: Date[];
  startDate?: Date;
  endDate?: Date;
  timeFormat?: '12' | '24';
  numberOfMonths?: number;
  minuteStep?: number;
  secondStep?: number;
  selectsStart?: boolean;
  selectsEnd?: boolean;
  showTimePicker?: boolean;
  showTimeSelectOnly?: boolean;
  className?: string;
  readOnly?: boolean;
  disabled?: boolean;
  size?: 'md' | 'lg';
  onChange?: (date: Date | [Date | null, Date | null] | undefined) => void;
  onChangeStart?: (date: Date | undefined) => void;
  onChangeEnd?: (date: Date | undefined) => void;
  placeholderStart?: string;
  placeholderEnd?: string;
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
    placeholderStart = 'Start Date',
    placeholderEnd = 'End Date',
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
    onChangeStart,
    onChangeEnd,
    locale,
  },
  ref,
) => {
  const datePickerRef = useRef<any>(null);

  // const { i18n } = useTranslation();
  const currentLocale = ko;
  // const currentLang = locale || i18n.language;
  // const currentLocale = useCreation(() => {
  //   const targetLocale = locale || currentLang;
  //   return (
  //     dayjsToDateFnsLocaleMap[targetLocale] ||
  //     dayjsToDateFnsLocaleMap[targetLocale.split('-')[0]] ||
  //     enUS
  //   );
  // }, [locale, currentLang]);

  // const dynamicPlaceholder = useCreation(() => {
  //   const today = dayjs();
  //   const targetLocale = locale || currentLang;

  //   if (placeholder) return placeholder; // 사용자가 명시적으로 placeholder를 지정한 경우

  //   try {
  //     switch (displayType) {
  //       case 'year':
  //         return today.format(getDateTimeFormat(DATE_TIME_FORMAT.YEAR));

  //       case 'month':
  //         return today.format(getDateTimeFormat(DATE_TIME_FORMAT.MONTH));

  //       case 'day':
  //         return today.format(getDateTimeFormat(DATE_TIME_FORMAT.DATE));

  //       case 'time':
  //       case 'time-hm':
  //         return today.format(getDateTimeFormat(DATE_TIME_FORMAT.HOUR_MIN));

  //       case 'day-time':
  //       case 'day-time-hm':
  //         return today.format(getDateTimeFormat(DATE_TIME_FORMAT.DATETIME_MIN));

  //       case 'day-time-hms':
  //         return today.format(getDateTimeFormat(DATE_TIME_FORMAT.DATETIME_SEC));

  //       default:
  //         return today.format(getDateTimeFormat(DATE_TIME_FORMAT.DATE));
  //     }
  //   } catch (error) {
  //     // fallback placeholder
  //     return displayType === 'year'
  //       ? '2024'
  //       : displayType === 'month'
  //         ? '2024-01'
  //         : displayType === 'time' || displayType === 'time-hm'
  //           ? '00:00'
  //           : '2024-01-01';
  //   }
  // }, [displayType, currentLocale, locale, currentLang, placeholder]);

  // from-to용 동적 placeholder들
  // const dynamicPlaceholderStart = useCreation(() => {
  //   if (placeholderStart) return placeholderStart;

  //   const today = dayjs();

  //   try {
  //     return today.format(getDateTimeFormat(DATE_TIME_FORMAT.DATE));
  //   } catch (error) {
  //     const targetLocale = locale || currentLang;
  //     const isKorean = targetLocale === 'ko' || targetLocale.startsWith('ko-');
  //     return isKorean ? '시작 날짜' : 'Start Date';
  //   }
  // }, [currentLocale, locale, currentLang, placeholderStart]);

  // const dynamicPlaceholderEnd = useCreation(() => {
  //   if (placeholderEnd) return placeholderEnd;

  //   const tomorrow = dayjs().add(1, 'day');

  //   try {
  //     return tomorrow.format(getDateTimeFormat(DATE_TIME_FORMAT.DATE));
  //   } catch (error) {
  //     const targetLocale = locale || currentLang;
  //     const isKorean = targetLocale === 'ko' || targetLocale.startsWith('ko-');
  //     return isKorean ? '종료 날짜' : 'End Date';
  //   }
  // }, [currentLocale, locale, currentLang, placeholderEnd]);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    Array.isArray(value) ? undefined : (value as Date | undefined),
  );

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(
    Array.isArray(value) ? (value as [Date | null, Date | null]) : [null, null],
  );

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
    const dayjsFormat = getDateTimeFormat(format);
    const fnsFormat = convertDateFormatToFns(dayjsFormat);

    // 영어 locale에서 슬래시를 사용하는 경우, react-datepicker가 제대로 파싱하도록 수정
    return fnsFormat;
  }, [dateTimeFormat, displayType]);

  const parseDateFormat = useCreation(() => {
    if (dateFormat.includes('/')) {
      return dateFormat.replace(/\//g, '-');
    }
    return dateFormat;
  }, [dateFormat]);

  // const handleChange = (date: Date | null) => {
  //   setSelectedDate(date || undefined);

  //   if (onChange) {
  //     onChange(date || undefined);
  //   }
  // };
  const handleChange = (date: Date | string | null) => {
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
    const tmp = date?.toString();

    console.log(tmp);

    setSelectedDate(parsedDate);

    if (onChange) {
      onChange(parsedDate);
    }
  };

  const handleRangeChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);

    if (onChange) {
      onChange(dates);
    }

    const [start, end] = dates;
    if (onChangeStart) {
      onChangeStart(start || undefined);
    }
    if (onChangeEnd) {
      onChangeEnd(end || undefined);
    }

    if (start && end && datePickerRef.current) {
      datePickerRef.current.setOpen(false);
    }
  };

  useEffect(() => {
    if (Array.isArray(value)) {
      setDateRange(value as [Date | null, Date | null]);
    } else {
      setSelectedDate(value as Date | undefined);
    }
  }, [value]);

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
          placeholder={showSeconds ? 'HH:MM:SS' : 'HH:MM'}
        />
      </div>
    );
  }

  // 2. Date range picker
  if (displayType === 'from-to') {
    return (
      <div className={cn('nlp--datepicker-time', 'nlp--datepicker-from-to', size)} ref={ref}>
        <Primitive
          ref={datePickerRef}
          showIcon
          selectsRange
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          dateFormat={dateFormat}
          shouldCloseOnSelect={false}
          readOnly={readOnly}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          // placeholderText={`${placeholderStart} ~ ${placeholderEnd}`}
          icon={<IcoCalendar01 width={16} height={16} stroke="#4C515E" fill="none" />}
          isClearable={true}
          monthsShown={numberOfMonths}
          wrapperClassName={'datepicker_wrap'}
          className={cn('datepicker_input', className)}
          onChange={(dates) => handleRangeChange(dates as [Date | null, Date | null])}
          excludeDates={disabledDates}
          renderDayContents={(day) => {
            return <span className="date_text">{day}</span>;
          }}
          locale={currentLocale}
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
          placeholderText={new Date(currentYear, 0, 1).getFullYear().toString()}
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
          // placeholderText={placeholder}
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
            // placeholderText="YYYY-MM-DD"
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
            value={selectedDate || new Date()}
            onChange={handleChange}
            minuteStep={minuteStep}
            secondStep={secondStep}
            showSeconds={showSeconds}
            // placeholder={showSeconds ? 'HH:MM:SS' : 'HH:MM'}
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
        // minDate={minDate}
        // maxDate={maxDate}
        selected={selectedDate}
        // placeholderText={placeholder}
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
        locale={enUS}
        // placeholderText={dynamicPlaceholder}
      />
    </div>
  );
};

export const DatePicker = forwardRef<HTMLDivElement, DatePickerComponentProps>(DatePickerComponent);
