import { RangeDatePicker, RangeDatePickerProps } from '@learnway/ui';
import { FC, useMemo } from 'react';
// import styles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

/**
 * @description Date-Time Range Picker (YYYY-MM-DD HH:MM ~ YYYY-MM-DD HH:MM)
 */
const DateTimeRangePickerFormFieldComponent: FC<RangeDatePickerProps> = ({
  displayType = 'day-time-hm',
  value,
  onChange,
  minDate,
  maxDate,
  ...props
}) => {
  // const [from, setFrom] = useState<Date | null>(value?.[0] ?? null);
  // const [to, setTo] = useState<Date | null>(value?.[1] ?? null);

  const pickerValue: [Date | null, Date | null] = useMemo(() => {
    return [value?.[0] ?? null, value?.[1] ?? null];
  }, [value]);

  const handleFromDate = (fromDate: Date | undefined) => {
    onChange?.([fromDate ?? null, value?.[1] ?? null]);
    // setFrom(value ? value : null);
  };

  const handleToDate = (toDate: Date | undefined) => {
    onChange?.([value?.[0] ?? null, toDate ?? null]);
    // setTo(value ? value : null);
  };

  return (
    <RangeDatePicker
      {...props}
      displayType={displayType}
      onChange={onChange}
      onChangeStart={handleFromDate}
      onChangeEnd={handleToDate}
      value={pickerValue}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
};

export const DateTimeRangePickerFormField = DateTimeRangePickerFormFieldComponent;
