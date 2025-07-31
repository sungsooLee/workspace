import { FC } from 'react';
import { RangeDatePickerProps } from '@learnway/ui/date-picker';
import { RangeDatePicker } from '@learnway/ui/date-picker';

/**
 * @description Date Range Picker 시작일~종료일 선택 (YYYY-MM-DD HH:mm:ss ~ YYYY-MM-DD HH:mm:ss)
 */
const DateRangeSearchFieldComponent: FC<RangeDatePickerProps> = ({
  displayType = 'day',
  value,
  onChange,
  minDate,
  maxDate,
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

export const DateRangeSearchField = DateRangeSearchFieldComponent;
