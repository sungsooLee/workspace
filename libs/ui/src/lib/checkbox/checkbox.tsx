import { forwardRef } from 'react';
import { cn } from '@learnway/shared';
import { Checkbox } from '../shadcn/checkbox';
import { CheckFieldProps } from './type';

const FormCheckBox = forwardRef<HTMLButtonElement, CheckFieldProps>(
  ({ value, onChange, disabled, className, checkboxLabel }, ref) => {
    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          //   id={name}
          ref={ref}
          checked={value}
          onCheckedChange={onChange}
          disabled={disabled}
          className={cn(
            'group-[.has-error]:border-red-500 group-[.has-error]:focus:border-red-500',
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
