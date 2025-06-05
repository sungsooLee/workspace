import { FC, useEffect, useState } from 'react';
import { DatePicker } from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

const DateRangePickerFormFieldComponent: FC<any> = ({
  value,
  onChange,
  onChangeGuideText,
  minDate,
  maxDate,
}) => {
  const [from, setFrom] = useState(value.from ?? undefined);
  const [to, setTo] = useState(value.to ?? undefined);
  const handleFromDate = (value: any) => {
    onChange({ from: value, to: to });
    setFrom(value);
  };

  const handleToDate = (value: any) => {
    onChange({ from: from, to: value });
    setTo(value);
  };

  useEffect(() => {
    console.log('onChangeGuideText => ', onChangeGuideText);
  }, []);

  return (
    <>
      <DatePicker
        onChange={handleFromDate}
        value={from}
        minDate={minDate}
        maxDate={maxDate}
        className={styles.datepicker_item}
      />
      <span className={styles.dash}></span>
      <DatePicker
        onChange={handleToDate}
        value={to}
        minDate={minDate}
        maxDate={maxDate}
        className={styles.datepicker_item}
      />
    </>
  );
};

export const DateRangePickerFormField = DateRangePickerFormFieldComponent;
