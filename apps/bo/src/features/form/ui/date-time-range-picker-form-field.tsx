import { FC, useEffect, useState } from 'react';
import { RangeDatePicker, RangeDatePickerProps } from '@learnway/ui';
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
  const [from, setFrom] = useState<Date | null>(value?.[0] ?? null);
  const [to, setTo] = useState<Date | null>(value?.[1] ?? null);

  const handleFromDate = (value: Date | undefined) => {
    onChange?.([value ? value : null, to ? to : null]);

    setFrom(value ? value : null);
  };

  const handleToDate = (value: Date | undefined) => {
    onChange?.([from, value ? value : null]);
    setTo(value ? value : null);
  };

  return (
    <RangeDatePicker
      {...props}
      displayType={displayType}
      onChange={onChange}
      onChangeStart={handleFromDate}
      onChangeEnd={handleToDate}
      value={[from, to]}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
};

export const DateTimeRangePickerFormField = DateTimeRangePickerFormFieldComponent;
