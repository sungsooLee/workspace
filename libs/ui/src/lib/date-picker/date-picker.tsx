import { forwardRef, useState, useEffect } from 'react';
import Primitive from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './date-picker.module.css';
import './date-picker.css'; // date-picker style
import { IcoCalendar01 } from '@learnway/icons';

import { DATE_TIME_FORMAT, getDateTimeFormat, cn } from '@learnway/shared';
import { BaseFieldProps } from '../type';
import { useCreation } from 'ahooks';

import { convertDateFormatToFns } from './date-picker.service';

export interface DatePickerComponentProps extends BaseFieldProps<Date> {
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
  selectsStart?: boolean;
  selectsEnd?: boolean;
  showTimePicker?: boolean;
  className?: string;
  onChange?: (date: Date | undefined) => void;
}

const DatePickerComponent = forwardRef<HTMLDivElement, DatePickerComponentProps>(
  (
    {
      dateTimeFormat = DATE_TIME_FORMAT.DATE,
      value,
      onChange,
      placeholder = 'Pick a date',
      minDate, // = new Date('2025-01-10'),
      maxDate, // = new Date(),
      selected,
      disabledDates,
      numberOfMonths = 1,
      showTimePicker = false,
      timeFormat = '24',
      minuteStep = 15,
      className,
    },
    ref,
  ) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);

    const dateFormat = useCreation(() => {
      return convertDateFormatToFns(getDateTimeFormat(dateTimeFormat));
    }, [dateTimeFormat]);

    const showTimeInput = useCreation(() => {
      return dateTimeFormat.toUpperCase().includes('TIME');
    }, [dateTimeFormat]);

    const ExampleCustomTimeInput = ({ value, onChange }: any) => (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => (e.target as any)?.focus()}
        style={{ border: 'solid 1px pink' }}
      />
    );

    const handleChange = (date: Date | undefined) => {
      setSelectedDate(date);

      if (onChange) {
        onChange(date);
      }
    };
    useEffect(() => {
      setSelectedDate(value);
    }, [value]);
    return (
      <div className="nlp--datepicker">
        <Primitive
          showIcon
          dateFormat={dateFormat}
          shouldCloseOnSelect
          minDate={minDate}
          maxDate={maxDate}
          selected={selectedDate}
          onChange={(date) => handleChange(date ?? undefined)}
          icon={<IcoCalendar01 width={16} height={16} stroke="#4C515E" fill="none" />}
          isClearable={true}
          showTimeInput={showTimeInput}
          monthsShown={numberOfMonths}
          wrapperClassName={'datepicker_wrap'}
          className={cn(styles.datepicker_input, className)}
          //customTimeInput={<ExampleCustomTimeInput />}
        />
      </div>
    );
  },
);

export const DatePicker = DatePickerComponent;
