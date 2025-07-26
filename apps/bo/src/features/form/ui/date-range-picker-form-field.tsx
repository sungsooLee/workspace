import { FC } from 'react';
import { RangeDatePicker, RangeDatePickerProps } from '@learnway/ui';

// interface DateRangePickerFormFieldProps extends Omit<RangeDatePickerProps> {
//   value?: { from?: Date; to?: Date };
//   onChange?: (value: { from?: Date; to?: Date }) => void;
// }

/**
 * @description Date Range Picker 시작일~종료일 선택 (YYYY-MM-DD HH:mm:ss ~ YYYY-MM-DD HH:mm:ss)
 */
const DateRangePickerFormFieldComponent: FC<RangeDatePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  displayType = 'day',
  ...props
}) => {
  return (
    <RangeDatePicker
      {...props}
      displayType={displayType}
      onChange={onChange}
      value={value}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
};

export const DateRangePickerFormField = DateRangePickerFormFieldComponent;
