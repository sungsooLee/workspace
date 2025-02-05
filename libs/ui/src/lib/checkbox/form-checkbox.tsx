import { FC } from 'react';
import { FormDialogProps } from '../type';
import { Controller } from 'react-hook-form';
import { Checkbox } from './checkbox';

const FormCheckBoxComponent: FC<FormDialogProps> = ({ control, label, name }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref }, formState: { errors } }) => {
        const isChecked = 'Y' === value;
        const hideLabel = !label;
        return (
          <Checkbox
            ref={ref}
            name={name}
            onClick={() => {
              onChange(value === 'Y' ? 'N' : 'Y');
            }}
            checked={isChecked}
            hideLabel={hideLabel}
            label={label}
          />
        );
      }}
    />
  );
};
export const FormCheckbox = FormCheckBoxComponent;
