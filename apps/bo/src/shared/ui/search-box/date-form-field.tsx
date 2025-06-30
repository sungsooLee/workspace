import { DatePicker } from '@learnway/ui';
import searchStyles from '@learnway/styles/bo/assets/styles/modules/search-box.module.css';
import { FC, useEffect, useState } from 'react';

const DateFormFieldComponent: FC<any> = ({ value, onChange }) => {
  const handleOnChange = (value: any) => {
    onChange(value);
  };

  return (
    <div className={searchStyles.datepicker_wrap}>
      <DatePicker
        displayType={'day'}
        onChange={handleOnChange}
        value={value}
        className={searchStyles.datepicker_item}
      />
    </div>
  );
};

export const DateFormField = DateFormFieldComponent;
