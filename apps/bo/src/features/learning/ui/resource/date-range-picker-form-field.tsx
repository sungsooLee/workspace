import { FC, useEffect, useState } from 'react';
import { Button, DatePicker } from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/form.module.css';

const DateRangePickerFormFieldComponent: FC<any> = ({ onFormChange, onChangeGuideText }) => {
  const [date, setDate] = useState(new Date('2024-01-01'));
  const [date2, setDate2] = useState(new Date('2024-01-01'));
  const handleDate = (value: any) => {
    setDate(value);
  };

  const handleDate2 = (value: any) => {
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
