import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../shadcn/select';
import { cn } from '@learnway/shared';
import { FormMode, SelectFieldConfig, SelectOption } from '../type';

export interface CustomSelectProps extends React.ComponentPropsWithoutRef<typeof Select> {
  options: SelectOption[];
  error?: boolean;
  mode?: FormMode;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const FormSelect = React.forwardRef<React.ElementRef<typeof Select>, SelectFieldConfig>(
  ({ options, error, mode = 'edit', value, onChange, disabled, className, ...props }, ref) => {
    if (mode === 'read') {
      const selectedOption = options.find((opt) => opt.value === value);
      return <div className={cn('w-full py-2 text-sm text-gray-900')}>{selectedOption?.label}</div>;
    }

    return (
      <Select value={value} onValueChange={onChange} disabled={disabled} {...props}>
        <SelectTrigger
          ref={ref}
          className={cn(
            'w-full',
            'focus:outline-none focus:border-blue-500',
            error && 'border-red-500 focus:border-red-500',
          )}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ value, label }) => (
            <SelectItem key={value} value={value} className="cursor-pointer">
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
);

export default FormSelect;
