import { InputHTMLAttributes, FC } from 'react';
import { FormDialogProps } from '../type';
import { Controller } from 'react-hook-form';
import { cn } from '@learnway/shared';
import { clsx } from 'clsx';

import styles from './checkbox.module.css';
import { IcoFormRequired } from '@learnway/icons';
import { Checkbox } from './checkbox';

const FormCheckBoxGroupComponent: FC<FormDialogProps> = ({ control, label, name }) => {
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
export const FormCheckboxGroup = FormCheckBoxGroupComponent;
