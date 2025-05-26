import { FC, useEffect, useState } from 'react';
import { DatePicker } from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

const DateRangePickerFormFieldComponent: FC<any> = ({ value, onChange, onChangeGuideText }) => {
  const [date, setDate] = useState(value.from ?? undefined);
  const [date2, setDate2] = useState(value.to ?? undefined);
  const handleDate = (value: any) => {
    onChange({ from: value, to: date });
    setDate(value);
  };

  const handleDate2 = (value: any) => {
    onChange({ from: date, to: value });
    setDate2(value);
  };

  useEffect(() => {
    console.log('onChangeGuideText => ', onChangeGuideText);
  }, []);
  return (
    <>
      <DatePicker onChange={handleDate} value={date} className={styles.datepicker_item} />
      <span className={styles.dash}></span>
      <DatePicker onChange={handleDate2} value={date2} className={styles.datepicker_item} />
    </>
  );
};

export const DateRangePickerFormField = DateRangePickerFormFieldComponent;
