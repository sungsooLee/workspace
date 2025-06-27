import { DatePicker } from '@learnway/ui';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import { FC, useEffect, useState } from 'react';

const DateRangeFormFieldComponent: FC<any> = ({ value, onChange, onChangeGuideText }) => {
  const [from, setFrom] = useState(value.from ?? undefined);
  const [to, setTo] = useState(value.to ?? undefined);
  const handleDate = (value: any) => {
    onChange({ from: value, to: to });
    setFrom(value);
  };

  const handleDate2 = (value: any) => {
    onChange({ from: from, to: value });
    setTo(value);
  };

  useEffect(() => {
    setFrom(value.from);
    setTo(value.to);
  }, [value]);

  useEffect(() => {
    console.log('onChangeGuideText => ', onChangeGuideText);
  }, []);

  return (
    <div className={searchStyles.datepicker_wrap}>
      <DatePicker
        displayType={'day'}
        onChange={handleDate}
        value={from}
        className={searchStyles.datepicker_item}
      />
      <span className={searchStyles.hyphen}>-</span>
      <DatePicker
        displayType={'day'}
        onChange={handleDate2}
        value={to}
        className={searchStyles.datepicker_item}
      />
    </div>
  );
};

export const DateRangeFormField = DateRangeFormFieldComponent;
