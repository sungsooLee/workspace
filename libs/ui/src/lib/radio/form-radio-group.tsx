import { FC } from 'react';
import { FormDialogProps } from '../type';
import { Controller } from 'react-hook-form';
import { Radio } from './radio';

const FormRadioGroupComponent: FC<FormDialogProps> = ({ control, name, items = [] }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref } }) => {
        return (
          <Radio
            ref={ref}
            onValueChange={onChange}
            value={value}
            options={items.map((item) => ({ value: item.code, label: item.name }))}
          />
        );
      }}
    />
  );
};
export const FormRadioGroup = FormRadioGroupComponent;
