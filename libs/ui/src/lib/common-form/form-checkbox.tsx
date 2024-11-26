import { forwardRef } from 'react';
import { CheckFieldConfig } from './type';
import { cn } from '@/libs/shared/src';
import { Checkbox } from '../checkbox/checkbox';
import { FormLabel } from '../form/form';

const FormCheckBox = forwardRef<HTMLButtonElement, CheckFieldConfig>(
  ({ checked, onCheckedChange, disabled, error, mode = 'edit', className, checkboxLabel }, ref) => {
    if (mode === 'read') {
      return (
        <div className={cn('py-2 px-3 text-sm text-gray-900', className)}>
          {checked ? '예' : '아니오'}
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          //   id={name}
          ref={ref}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          className={cn(
            error && 'border-red-500',
            disabled && 'opacity-50 cursor-not-allowed',
            className,
          )}
        />
        {checkboxLabel && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {checkboxLabel}
          </label>
        )}
      </div>
    );
  },
);

export default FormCheckBox;
