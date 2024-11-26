import { forwardRef } from 'react';
import { RadioFieldConfig } from './type';
import { cn } from '@/libs/shared/src';
import { RadioGroup, RadioGroupItem } from '../radio/radio-group';
import { FormControl, FormItem, FormLabel } from '../form/form';

const FormRadioGroup = forwardRef<HTMLDivElement, RadioFieldConfig>(
  (
    {
      value,
      onValueChange,
      options,
      orientation = 'vertical',
      error,
      mode = 'edit',
      disabled,
      className,
    },
    ref,
  ) => {
    if (mode === 'read') {
      const selectedOption = options.find((opt) => opt.value === value);
      return (
        <div className={cn('py-2 px-3 text-sm text-gray-900', className)}>
          {selectedOption?.label || '-'}
        </div>
      );
    }

    return (
      <RadioGroup
        ref={ref}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        className={cn(
          orientation === 'vertical' ? 'flex flex-col space-y-1' : 'flex flex-row space-x-4',
          error && 'text-destructive',
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

FormRadioGroup.displayName = 'FormRadioGroup';

export default FormRadioGroup;
