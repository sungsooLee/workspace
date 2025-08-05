import { forwardRef } from 'react';
import { DatePicker2, DatePickerComponentProps2 } from './date-picker2';

export interface PeriodPickerValue {
  from?: Date;
  to?: Date;
}

export interface PeriodPickerProps
  extends Omit<DatePickerComponentProps2, 'onBlur' | 'onFocus' | 'onChange' | 'value'> {
  value: PeriodPickerValue;
  onChange?: (value: PeriodPickerValue) => void;
}

const Component = forwardRef<HTMLDivElement, PeriodPickerProps>((props, ref) => {
  const { onChange, value } = props;

  const handleChangeStart = (date: Date | undefined) => {
    console.log('#### period-picker : handleChangeStart', date);
    handleChange?.({ ...value, from: date });
  };

  const handleChangeEnd = (date: Date | undefined) => {
    console.log('#### period-picker : handleChangeEnd', date);
    handleChange?.({ ...value, to: date });
  };

  const handleChange = ({ from, to }: PeriodPickerValue) => {
    console.log('#### period-picker : handleChange', { from, to });
    onChange?.({ from, to });
  };

  return (
    <div className="nlp--datepicker-from-to" ref={ref}>
      <DatePicker2
        {...props}
        onChange={handleChangeStart}
        value={value.from}
        startDate={value.from}
        endDate={value.to}
      />
      <span className="hyphen"></span>
      <DatePicker2
        {...props}
        onChange={handleChangeEnd}
        value={value.to}
        startDate={value.from}
        endDate={value.to}
      />
    </div>
  );
});

export const PeriodPicker = Component;
