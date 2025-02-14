import { forwardRef } from 'react';
import { Radio } from './radio';

const FormRadioGroupComponent = forwardRef<HTMLDivElement, any>(
  ({ value, name, onChange, options, ...props }, ref) => {
    return (
      <Radio
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
export const FormRadioGroup = FormRadioGroupComponent;
