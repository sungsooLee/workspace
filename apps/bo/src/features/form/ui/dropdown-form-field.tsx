import React, { forwardRef } from 'react';
import { BaseFormFieldProps, OptionsConfig, SelectOption, useFormOptions } from '@learnway/hooks';
import { Dropdown, DropdownComponentProps } from '@learnway/ui';

interface DropdownFormFieldType extends BaseFormFieldProps<string> {
  options?: SelectOption[];
  optionsConfig?: OptionsConfig;
  dropdownConfig?: DropdownComponentProps;
  labelField?: string;
  valueField?: string;
}

const DropdownFormFieldComponent = forwardRef<HTMLDivElement, DropdownFormFieldType>(
  (
    {
      value,
      onChange,
      options: initOptions,
      optionsConfig,
      dropdownConfig,
      currentOptionsState,
      ...props
    },
    ref,
  ) => {
    const options = useFormOptions(initOptions, optionsConfig, currentOptionsState);

    return (
      <Dropdown
        {...props}
        {...dropdownConfig}
        ref={ref}
        value={value}
        options={options}
        onChange={onChange}
      />
    );
  },
);

export const DropdownFormField = DropdownFormFieldComponent;
