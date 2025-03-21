import { forwardRef, useEffect, useState, ForwardRefRenderFunction, useRef } from 'react';
import Primitive from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.css'; // date-picker style
import { IcoCalendar01 } from '@learnway/icons';

import { cn, DATE_TIME_FORMAT, getDateTimeFormat } from '@learnway/shared';
import { BaseFieldProps } from '../type';
import { useCreation } from 'ahooks';

import { convertDateFormatToFns } from './date-picker.service';
import { PopoverTimeInput } from './custom-time-picker';
import { ReactNode } from '@tanstack/react-router';

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
  onChange?: (date: Date | [Date | null, Date | null] | undefined) => void;
  onChangeStart?: (date: Date | undefined) => void;
  onChangeEnd?: (date: Date | undefined) => void;
  placeholderStart?: string;
  placeholderEnd?: string;
  renderDayContents?: ReactNode;
}

// DatePicker 컴포넌트 정의
const DatePickerComponent: ForwardRefRenderFunction<HTMLDivElement, DatePickerComponentProps> = (
  {
    displayType = 'day',
    dateTimeFormat = DATE_TIME_FORMAT.DATE,
    value,
    onChange,
    placeholder = 'Pick a date',
    placeholderStart = 'Start Date',
    placeholderEnd = 'End Date',
    minDate,
    maxDate,
    selected,
    disabledDates,
    numberOfMonths = 1,
    showTimePicker = false,
    timeFormat = '24',
    minuteStep = 15,
    secondStep = 15,
    className,
    readOnly,
    disabled,
    onChangeStart,
    onChangeEnd,
  },
  ref,
) => {
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
    return convertDateFormatToFns(getDateTimeFormat(format));
  }, [dateTimeFormat, displayType]);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date || undefined);

    if (onChange) {
      onChange(date || undefined);
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
      <div className={cn('nlp--datepicker-wrap', 'nlp--datepicker-time-hm')} ref={ref}>
        <PopoverTimeInput
          value={selectedDate || new Date()}
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
      <div className={cn('nlp--datepicker-time', 'nlp--datepicker-from-to')} ref={ref}>
        <Primitive
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
          placeholderText={`${placeholderStart} ~ ${placeholderEnd}`}
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
        />
      </div>
    );
  }

  // 3. Year picker
  if (displayType === 'year') {
    return (
      <div className={cn('nlp--datepicker', 'nlp--datepicker-year')} ref={ref}>
        <Primitive
          showIcon
          dateFormat={dateFormat}
          shouldCloseOnSelect
          readOnly={readOnly}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          selected={selectedDate}
          placeholderText={placeholder}
          icon={<IcoCalendar01 width={16} height={16} stroke="#4C515E" fill="none" />}
          isClearable={true}
          showYearPicker
          yearItemNumber={9}
          monthsShown={numberOfMonths}
          wrapperClassName={'datepicker_wrap'}
          className={cn('datepicker_input', className)}
          onChange={handleChange}
          excludeDates={disabledDates}
        />
      </div>
    );
  }

  // 4. Month picker
  if (displayType === 'month') {
    return (
      <div className={cn('nlp--datepicker', 'nlp--datepicker-month')} ref={ref}>
        <Primitive
          showIcon
          dateFormat={dateFormat}
          shouldCloseOnSelect
          readOnly={readOnly}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          selected={selectedDate}
          placeholderText={placeholder}
          icon={<IcoCalendar01 width={16} height={16} stroke="#4C515E" fill="none" />}
          isClearable={true}
          showMonthYearPicker
          monthsShown={numberOfMonths}
          wrapperClassName={'datepicker_wrap'}
          className={cn('datepicker_input', className)}
          onChange={handleChange}
          excludeDates={disabledDates}
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
      <div className="nlp--datepicker-time-wrap" ref={ref}>
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
            placeholderText="YYYY-MM-DD"
            icon={<IcoCalendar01 width={16} height={16} stroke="#4C515E" fill="none" />}
            isClearable={true}
            monthsShown={numberOfMonths}
            wrapperClassName={'datepicker_wrap'}
            onChange={handleChange}
            excludeDates={disabledDates}
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
            placeholder={showSeconds ? 'HH:MM:SS' : 'HH:MM'}
          />
        </div>
      </div>
    );
  }

  // 6. Default day picker
  return (
    <div className="nlp--datepicker-time" ref={ref}>
      <Primitive
        showIcon
        dateFormat={dateFormat}
        shouldCloseOnSelect
        readOnly={readOnly}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        selected={selectedDate}
        placeholderText={placeholder}
        icon={<IcoCalendar01 width={16} height={16} stroke="#4C515E" fill="none" />}
        isClearable={true}
        monthsShown={numberOfMonths}
        wrapperClassName={'datepicker_wrap'}
        className={cn('datepicker_input', className)}
        onChange={handleChange}
        excludeDates={disabledDates}
      />
    </div>
  );
};

export const DatePicker = forwardRef<HTMLDivElement, DatePickerComponentProps>(DatePickerComponent);
