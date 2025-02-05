import { FC } from 'react';
import { DateRange, FieldType, FormDialogProps } from '../type';
import { Controller } from 'react-hook-form';
import { DateRangePicker } from './date-range-picker';
import { DATE_TIME_FORMAT, getDateTimeFormat } from '@learnway/shared';
import dayjs from 'dayjs';

const FormDateRangePickerComponent: FC<FormDialogProps> = ({ control, label, name }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref }, formState: { errors } }) => {
        const [from, to] = value.split('|');
        const pickerValue = {
          from: dayjs(from, getDateTimeFormat(DATE_TIME_FORMAT.DATE)).toDate(),
          to: dayjs(to, getDateTimeFormat(DATE_TIME_FORMAT.DATE)).toDate(),
        };
        const handleDateRangeChange = (dateRange: DateRange | undefined) => {
          if (!dateRange) return;
          dateRange.from.format(getDateTimeFormat(DATE_TIME_FORMAT.DATE));
          console.log(dateRange);
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

export const FormDateRangePicker = FormDateRangePickerComponent;
