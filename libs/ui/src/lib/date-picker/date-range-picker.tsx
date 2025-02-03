import { forwardRef, useState } from 'react';
import { useCreation } from 'ahooks';

import { DATE_TIME_FORMAT, getDateTimeFormat } from '@learnway/shared';

import { DatePicker, DatePickerComponentProps } from './date-picker';
import { FieldType, DateRange } from '../type';

export interface DateRangeFieldProps extends Omit<DatePickerComponentProps, 'value' | 'onChange'> {
  type: FieldType.DATE_RANGE;
  value?: DateRange | undefined;
  onChange?: (range: DateRange | undefined) => void;
  fromLabel?: string;
  toLabel?: string;
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

    return (
      <>
        <DatePicker
          dateTimeFormat={dateFormat}
          value={startDate}
          onChange={(date) => handleStartChange(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={endDate}
        />
        <DatePicker
          dateTimeFormat={dateFormat}
          value={endDate}
          onChange={(date) => handleEndChange(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </>
    );
  },
);

export const DateRangePicker = DateRangePickerComponent;
