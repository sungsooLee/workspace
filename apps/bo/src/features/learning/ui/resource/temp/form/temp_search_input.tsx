import { Button, CardComponentProps, Input } from '@learnway/ui';
import { IcoSearch } from '@learnway/icons';
import formStyles from '../../../../../../assets/styles/modules/form.module.css';
import { forwardRef } from 'react';
const TempInputComponent = forwardRef<any, any>(({ value, onChange, placeholder }) => {
  return (
    <Input
      id="name-1-2"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={formStyles.input}
    />
  );
});

export const TempInput = TempInputComponent;
