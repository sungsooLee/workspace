import { FC } from 'react';
import { DateRange, FieldType, FormDialogProps } from '../type';
import { Controller } from 'react-hook-form';
import { DateRangePicker } from './date-range-picker';
import {
  DATE_TIME_FORMAT,
  getDateTimeFormat,
  getDateToString,
  getStringToDate,
} from '@learnway/shared';
import dayjs from 'dayjs';

const FormDateRangePickerComponent: FC<FormDialogProps> = ({
  control,
  label,
  name,
  value: defaultValue = '',
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref }, formState: { defaultValues } }) => {
        console.log('value 변환 => ', value);
        const [from, to] = value.split('|');
        const pickerValue = {
          from: getStringToDate(from),
          to: getStringToDate(to),
        };
        const handleDateRangeChange = (dateRange: DateRange | undefined) => {
          if (!dateRange) {
            onChange(defaultValue);
            return;
          }
          if (defaultValues) {
            const [defaultFrom, defaultTo] = defaultValues[name].split('|');
            let newFrom = defaultFrom;
            let newTo = defaultTo;
            console.log('defaultFrom => ', defaultFrom, '   defaultTo =>', defaultTo);
            try {
              if (dateRange.from) {
                newFrom = getDateToString(dateRange.from);
              }
            } catch {
              console.log('error');
            }
            try {
              if (dateRange.to) {
                newTo = getDateToString(dateRange.to);
              }
            } catch {
              console.log('error');
            }
            console.log(`${newFrom}|${newTo}`);
            onChange(`${defaultFrom}|${defaultTo}`);
          }
        };
        return (
          <DateRangePicker
            ref={ref}
            name={name}
            value={pickerValue}
            onChange={handleDateRangeChange}
            type={FieldType.DATE_RANGE}
          />
        );
      }}
    />
  );
};

/**
 * @deprecated
 */
export const FormDateRangePicker = FormDateRangePickerComponent;
