import { forwardRef, useMemo } from 'react';
import { RadioGroup } from '../../radio-group/radio-group';
import { cn } from '@learnway/shared';
import styles from './radio-group-form-field.module.css';
import { BaseFormFieldProps, OptionsConfig, useFormOptions } from '@learnway/hooks';
import { RadioGroupOption } from '../../radio-group/type';

export interface RadioGroupFormFieldProps extends BaseFormFieldProps<string> {
  options?: RadioGroupOption[];
  optionsConfig?: OptionsConfig;
  labelField?: string;
  valueField?: string;
}

const RadioGroupFormFieldComponent = forwardRef<HTMLDivElement, RadioGroupFormFieldProps>(
  (
    {
      value,
      name,
      onChange,
      options: initOptions,
      optionsConfig,
      cols,
      labelField = 'label',
      valueField = 'value',
      ...props
    },
    ref,
  ) => {
    const options = useFormOptions(initOptions, optionsConfig, undefined, labelField, valueField);

    const radioOptions = useMemo(() => {
      return options.map((option) => {
        const radioOption: RadioGroupOption = {
          ...option,
          value: String(option.value || ''),
        };

        if (
          option.value === optionsConfig?.optionsNode?.value &&
          optionsConfig?.optionsNode?.node
        ) {
          radioOption.node = optionsConfig.optionsNode.node;
        }

        return radioOption;
      });
    }, [options, optionsConfig]);

    return (
      <RadioGroup
        ref={ref}
        value={value}
        className={cn(styles.start, styles.radio_list, !cols && styles.type_flex)}
        style={cols ? { gridTemplateColumns: `repeat(${cols}, 1fr)` } : undefined}
        name={name}
        defaultValue={value}
        options={radioOptions}
        cols={cols}
        onValueChange={onChange}
        {...props}
      />
    );
  },
);
export const RadioGroupFormField = RadioGroupFormFieldComponent;
