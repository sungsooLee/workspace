import { forwardRef } from 'react';
import { cn } from '@learnway/shared';
import { RadioGroup, RadioGroupItem } from '../shadcn/radio-group';
import { Label } from '../shadcn/label';
import { RadioFieldProps } from './type';

const RadioComponent = forwardRef<HTMLDivElement, RadioFieldProps>(
  ({ orientation = 'vertical', className, options, ...props}, ref) => {
    return (
      <RadioGroup
        ref={ref}
        className={cn(
          orientation === 'vertical' ? 'flex flex-col space-y-1' : 'flex flex-row space-x-4',
          'group-[.has-error]:border-red-500 group-[.has-error]:focus:border-red-500 group-[.has-error]:text-destructive',
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.value} />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    )
  },
);

// FormRadioGroup.displayName = 'FormRadioGroup';

export const Radio = RadioComponent;
