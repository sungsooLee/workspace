import { forwardRef, useEffect, useState } from 'react';
import { useCreation } from 'ahooks';

import { DATE_TIME_FORMAT, getDateTimeFormat } from '@learnway/shared';

import { DatePicker, DatePickerComponentProps } from './date-picker';
import { DateRange, FieldType } from '../type';

export interface DateRangeFieldProps extends Omit<DatePickerComponentProps, 'value' | 'onChange'> {
  type: FieldType.DATE_RANGE;
  value?: DateRange | undefined;
  onChange?: (range: DateRange | undefined) => void;
  fromLabel?: string;
  toLabel?: string;
  readOnly?: boolean;
  disabled?: boolean;
}

const DateRangePickerComponent = forwardRef<HTMLDivElement, DateRangeFieldProps>(
  (
    {
      dateTimeFormat = DATE_TIME_FORMAT.DATE,
      value = { from: new Date(), to: undefined },
      onChange,
      error,
      mode = 'edit',
      placeholder = 'Pick a date range',
      fromLabel = 'From',
      toLabel = 'To',
      readOnly,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [startDate, setStartDate] = useState<Date | undefined>(value.from);
    const [endDate, setEndDate] = useState<Date | undefined>(value.to);

    const dateFormat = useCreation(() => {
      return getDateTimeFormat(dateTimeFormat);
    }, [dateTimeFormat]);

    const handleStartChange = (date: Date | undefined) => {
      setStartDate(date);

      if (onChange) {
        onChange({ from: date, to: endDate });
      }
    };

    const handleEndChange = (date: Date | undefined) => {
      setEndDate(date);

      if (onChange) {
        onChange({ from: startDate, to: date });
      }
    };
    useEffect(() => {
      setStartDate(value.from);
      setEndDate(value.to);
    }, [value]);
    return (
      <DatePicker
        dateTimeFormat={dateFormat}
        value={endDate}
        readOnly={readOnly}
        disabled={disabled}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        numberOfMonths={2}
        onChange={(date) => handleEndChange(date)}
      />
    );
  },
);

export const DateRangePicker = DateRangePickerComponent;
