import {
  DatePickerComponentProps2,
  PeriodPicker,
  PeriodPickerValue,
} from '@learnway/ui/date-picker2';
import { BaseFieldProps } from '@learnway/ui/type';
import { FC } from 'react';

interface PeriodPickerFormFieldProps extends BaseFieldProps<PeriodPickerValue> {
  // value: { from?: Date; to?: Date };
  // onChange?: (value: { from?: Date; to?: Date }) => void;
  datePickerConfig?: DatePickerComponentProps2;
}

/**
 * @description Date Range Picker 시작일~종료일 선택 (YYYY-MM-DD HH:mm:ss ~ YYYY-MM-DD HH:mm:ss)
 */
const Component: FC<PeriodPickerFormFieldProps> = ({
  value,
  onChange,
  datePickerConfig,
  ...props
}) => {
  const handleChange = (newValue: PeriodPickerValue) => {
    console.log('#### handleChange', value);
    onChange?.(newValue);
  };

  return <PeriodPicker {...datePickerConfig} onChange={handleChange} value={value || {}} />;
};

export const PeriodPickerFormField = Component;
