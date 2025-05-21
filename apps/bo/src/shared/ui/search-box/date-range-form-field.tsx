import { DatePicker } from '@learnway/ui';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import { FC, useEffect, useState } from 'react';

const DateRangeFormFieldComponent: FC<any> = ({ onChange, onChangeGuideText }) => {
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState();
  const handleDate = (value: any) => {
    onChange({ form: value, to: date });
    setDate(value);
  };

  const handleDate2 = (value: any) => {
    onChange({ form: date, to: value });
    setDate2(value);
  };

  useEffect(() => {
    console.log('onChangeGuideText => ', onChangeGuideText);
  }, []);

  return (
    <div className={searchStyles.datepicker_wrap}>
      <DatePicker onChange={handleDate} value={date} className={searchStyles.datepicker_item} />
      <span className={searchStyles.hyphen}>-</span>
      <DatePicker onChange={handleDate2} value={date2} className={searchStyles.datepicker_item} />
    </div>
  );
};

export const DateRangeFormField = DateRangeFormFieldComponent;
