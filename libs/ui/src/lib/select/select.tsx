import React from 'react';
import { cn } from '@learnway/shared';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../shadcn/select';
import { SelectFieldProps } from './type';

const FormSelect = React.forwardRef<React.ElementRef<typeof Select>, SelectFieldProps>(
  ({ options, value, onChange, disabled, className, ...props }, ref) => {
    return (
      <Select value={value} onValueChange={onChange} disabled={disabled} {...props}>
        <SelectTrigger
          ref={ref}
          className={cn(
            'w-full',
            'focus:outline-none focus:border-blue-500',
            'group-[.has-error]:border-red-500 group-[.has-error]:focus:border-red-500',
          )}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ value, label }) => (
            <SelectItem key={value} value={value && String(value)} className="cursor-pointer">
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
);

export default FormSelect;
