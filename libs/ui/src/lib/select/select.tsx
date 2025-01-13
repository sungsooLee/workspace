import { forwardRef, memo } from 'react';

import { cn } from '@learnway/shared';

import * as Primitive from './select.shadcn';
import { SelectFieldProps } from './type';

const SelectComponent = forwardRef<React.ElementRef<typeof Primitive.Select>, SelectFieldProps>(
  ({ options, value, onChange, disabled, className, ...props }, ref) => {
    return (
      <Primitive.Select value={value} onValueChange={onChange} disabled={disabled} {...props}>
        <Primitive.SelectTrigger
          ref={ref}
          className={cn(
            'nlp--select-trigger',
            'w-full',
            'focus:border-blue-500 focus:outline-none',
            'group-[.has-error]:border-red-500 group-[.has-error]:focus:border-red-500',
          )}>
          <Primitive.SelectValue />
        </Primitive.SelectTrigger>
        <Primitive.SelectContent>
          {options.map(({ value, label }) => (
            <Primitive.SelectItem
              key={value}
              value={value && String(value)}
              className={cn('nlp--select-item', 'cursor-pointer')}>
              {label}
            </Primitive.SelectItem>
          ))}
        </Primitive.SelectContent>
      </Primitive.Select>
    );
  },
);

export const Select = SelectComponent;
