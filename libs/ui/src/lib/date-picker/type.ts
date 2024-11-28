import { DateRange } from 'react-day-picker';
import { BaseFieldProps, FieldType } from '../type';

export interface DateProps extends BaseFieldProps {
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  showTimePicker?: boolean;
  timeFormat?: '12' | '24';
  numberOfMonths?: number;
  minuteStep?: number;
}

export interface DateFieldProps extends DateProps {
  type: FieldType.DATE;
  onChange?: (date: Date | undefined) => void;
}

export interface DateRangeFieldProps extends DateProps {
  type: FieldType.DATE_RANGE;
  onChange?: (range: DateRange | undefined) => void;
  fromLabel?: string;
  toLabel?: string;
}
