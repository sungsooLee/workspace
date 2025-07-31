import { DatePickerComponentProps } from '@learnway/ui/date-picker';
import { DatePicker } from '@learnway/ui/date-picker';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import { FC } from 'react';

/**
 * @description Date Picker 단일 선택 (YYYY-MM-DD HH:MM:SS)
 */
const DateSearchFieldComponent: FC<DatePickerComponentProps> = ({
  displayType = 'day',
  value,
  onChange,
  minDate,
  maxDate,
  ...props
}) => {
  return (
    <div className={searchStyles.datepicker_wrap}>
      <DatePicker
        {...props}
        displayType={displayType}
        onChange={onChange}
        value={value}
        minDate={minDate}
        maxDate={maxDate}
        className={searchStyles.datepicker_item}
      />
    </div>
  );
};

export const DateSearchField = DateSearchFieldComponent;
