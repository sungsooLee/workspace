import { forwardRef } from 'react';
import { RadioGroup } from '../../radio-group/radio-group';
import { cn } from '@learnway/shared';
import styles from './radio-group-form-field.module.css';
import { BaseFormFieldProps, OptionsConfig, SelectOption, useFormOptions } from '@learnway/hooks';
import { useTranslation } from 'react-i18next';

export interface RadioGroupFormFieldProps extends BaseFormFieldProps<string> {
  options?: SelectOption[];
  optionsConfig?: OptionsConfig;
}

const RadioGroupFormFieldComponent = forwardRef<HTMLDivElement, RadioGroupFormFieldProps>(
  ({ value, name, onChange, options: initOptions, optionsConfig, cols, ...props }, ref) => {
    const options = useFormOptions(initOptions, optionsConfig);
    const { t } = useTranslation();
    return (
      <RadioGroup
        ref={ref}
        value={value}
        name={name}
        defaultValue={value}
        onValueChange={onChange}
        options={options.map((item: any) => ({ value: item.value, label: t(item.label) }))}
        className={cn(styles.start, styles.radio_list, !cols && styles.type_flex)}
        cols={cols}
        style={cols ? { gridTemplateColumns: `repeat(${cols}, 1fr)` } : undefined}
        {...props}
      />
    );
  },
);
export const RadioGroupFormField = RadioGroupFormFieldComponent;
