import { forwardRef } from 'react';
import { RadioGroup } from '../../radio-group/radio-group';
import { cn } from '@learnway/shared';
import styles from './radio-group-form-field.module.css';

const RadioGroupFormFieldComponent = forwardRef<HTMLDivElement, any>(
  ({ value, name, onChange, options, cols, ...props }, ref) => {
    return (
      <RadioGroup
        ref={ref}
        value={value}
        defaultValue={value}
        onValueChange={onChange}
        options={options.map((item: any) => ({ value: item.value, label: item.label }))}
        className={cn(styles.start, styles.radio_list, !cols && styles.type_flex)}
        cols={cols}
        style={cols ? { gridTemplateColumns: `repeat(${cols}, 1fr)` } : undefined}
        {...props}
      />
    );
  },
);
export const RadioGroupFormField = RadioGroupFormFieldComponent;
