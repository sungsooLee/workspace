import { FC } from 'react';
import styles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { DatePicker, DatePickerComponentProps } from '@learnway/ui';

/**
 * @description Date Picker 단일 선택 (YYYY-MM-DD HH:MM:SS)
 */
const DatePickerFormFieldComponent: FC<DatePickerComponentProps> = ({
  displayType = 'day',
  value,
  onChange,
  minDate,
  maxDate,
  ...props
}) => {
  return (
    <DatePicker
      {...props}
      onChange={onChange}
      value={value}
      minDate={minDate}
      maxDate={maxDate}
      className={styles.datepicker_item}
    />
  );
};

export const DatePickerFormField = DatePickerFormFieldComponent;
