import { forwardRef } from 'react';
import { cn } from '@learnway/shared';
import { RadioGroup, RadioGroupItem } from '../shadcn/radio-group';
import { FormControl, FormItem, FormLabel } from '../shadcn/form';
import { RadioFieldProps } from './type';

const RadioComponent = forwardRef<HTMLDivElement, RadioFieldProps>(
  ({ value, onValueChange, options, orientation = 'vertical', disabled, className }, ref) => {
    return (
      <RadioGroup
        ref={ref}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        className={cn(
          orientation === 'vertical' ? 'flex flex-col space-y-1' : 'flex flex-row space-x-4',
          'group-[.has-error]:border-red-500 group-[.has-error]:focus:border-red-500 group-[.has-error]:text-destructive',
          className,
        )}>
        {options.map((option) => (
          <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value={option.value} disabled={disabled} />
            </FormControl>
            <div className="space-y-1">
              <FormLabel className="font-normal">{option.label}</FormLabel>
              {option.description && (
                <p className="text-sm text-muted-foreground">{option.description}</p>
              )}
            </div>
          </FormItem>
        ))}
      </RadioGroup>
    );
  },
);

// FormRadioGroup.displayName = 'FormRadioGroup';

export const Radio = RadioComponent;
