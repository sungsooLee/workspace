import { forwardRef } from 'react';
import { RadioGroup } from '../../radio-group/radio-group';

const RadioGroupFormFieldComponent = forwardRef<HTMLDivElement, any>(
  ({ value, name, onChange, options, ...props }, ref) => {
    return (
      <RadioGroup
        ref={ref}
        value={value}
        defaultValue={value}
        onValueChange={onChange}
        options={options.map((item: any) => ({ value: item.value, label: item.label }))}
        {...props}
      />
    );
  },
);
export const RadioGroupFormField = RadioGroupFormFieldComponent;
