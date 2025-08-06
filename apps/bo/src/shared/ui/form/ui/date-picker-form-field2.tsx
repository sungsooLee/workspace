import styles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import { DatePicker2, DatePickerComponentProps2 } from '@learnway/ui/date-picker2';
import { BaseFieldProps } from '@learnway/ui/type';
import { FC } from 'react';

// DatePickerFormField2Props: DatePicker2 컴포넌트에 전달할 props 타입 정의
interface DatePickerFormField2Props extends BaseFieldProps<Date> {
  datePickerConfig?: DatePickerComponentProps2; // datePicker2의 추가 설정 옵션
}

/**
 * @description Date Picker 단일 선택 (YYYY-MM-DD HH:MM:SS)
 * DatePicker2 컴포넌트를 활용한 폼 필드용 래퍼 컴포넌트입니다.
 *
 * @param {DatePickerFormField2Props} props - DatePicker2에 전달할 props
 * @property {Date} value - 선택된 날짜 값
 * @property {(value: Date) => void} [onChange] - 날짜 변경 시 호출되는 콜백
 * @property {DatePickerComponentProps2} [datePickerConfig] - DatePicker2의 추가 설정 옵션
 */

const Component: FC<DatePickerFormField2Props> = ({
  value,
  onChange,
  datePickerConfig,
  ...props
}) => {
  // 날짜가 변경될 때 호출되는 핸들러
  const handleChange = (date: Date | undefined) => {
    onChange?.(date as Date);
  };

  return (
    <DatePicker2
      {...datePickerConfig}
      value={value}
      className={styles.datepicker_item}
      onChange={handleChange}
    />
  );
};

// DatePickerFormField2 컴포넌트 export
export const DatePickerFormField2 = Component;
