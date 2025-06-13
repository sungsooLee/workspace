import { forwardRef, useEffect, useState, useRef } from 'react';
import { useCreation } from 'ahooks';
import { isEqual } from 'lodash';
import dayjs, { OpUnitType } from 'dayjs';

import { DATE_TIME_FORMAT, getDateTimeFormat } from '@learnway/shared';

import { DatePicker, DatePickerComponentProps } from './date-picker';
import { DateRange } from '../type';

import styles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

export interface TimeRangeFieldProps extends Omit<DatePickerComponentProps, 'value' | 'onChange'> {
  value?: DateRange | undefined;
  onChange?: (range: DateRange | undefined) => void;
}

const TimeRangePickerComponent = forwardRef<HTMLDivElement, TimeRangeFieldProps>(
  (
    {
      //dateTimeFormat = DATE_TIME_FORMAT.HOUR_MIN,
      value = { from: new Date(), to: undefined },
      onChange,
      minuteStep,
      size,
      ...props
    },
    ref,
  ) => {
    const [startDate, setStartDate] = useState<Date | undefined>(value.from);
    const [endDate, setEndDate] = useState<Date | undefined>(value.to);
    const prevValueRef = useRef<DateRange>(value);

    // const dateFormat = useCreation(() => {
    //   return getDateTimeFormat(dateTimeFormat);
    // }, [dateTimeFormat]);

    const handleStartChange = (date: any) => {
      setStartDate(date);

      if (onChange) {
        onChange({ from: date, to: endDate });
      }
    };

    const handleEndChange = (date: any) => {
      setEndDate(date);

      if (onChange) {
        onChange({ from: startDate, to: date });
      }
    };

    useEffect(() => {
      if (!isEqualDateRange(value, prevValueRef.current, 'minute')) {
        setStartDate(value.from);
        setEndDate(value.to);
        prevValueRef.current = value;
      }
    }, [value]);

    const isEqualDateRange = (
      range1: DateRange,
      range2: DateRange,
      unitType: OpUnitType,
    ): boolean => {
      const fromEqual = (() => {
        if (range1.from === undefined && range2.from === undefined) {
          return true;
        }
        if (range1.from === undefined || range2.from === undefined) {
          return false;
        }
        return dayjs(range1.from).isSame(dayjs(range2.from), unitType);
      })();

      const toEqual = (() => {
        if (range1.to === undefined && range2.to === undefined) {
          return true;
        }
        if (range1.to === undefined || range2.to === undefined) {
          return false;
        }
        return dayjs(range1.to).isSame(dayjs(range2.to), unitType);
      })();

      return fromEqual && toEqual;
    };

    return (
      <>
        <DatePicker
          displayType={'time'}
          onChange={handleStartChange}
          value={startDate}
          minuteStep={minuteStep ?? 1}
          size={size}
        />
        <span className={styles.dash}></span>
        <DatePicker
          displayType={'time'}
          onChange={handleEndChange}
          value={endDate}
          minuteStep={minuteStep ?? 1}
          size={size}
        />
      </>
    );
  },
);

export const TimeRangePicker = TimeRangePickerComponent;
