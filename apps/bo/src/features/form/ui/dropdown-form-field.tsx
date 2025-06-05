import React, { forwardRef } from 'react';
import { BaseFormFieldProps, OptionsConfig, SelectOption, useFormOptions } from '@learnway/hooks';
import { Dropdown, DropdownComponentProps } from '@learnway/ui';
import { useTranslation } from 'react-i18next';

interface DropdownFormFieldType extends BaseFormFieldProps<string> {
  options?: SelectOption[];
  optionsConfig?: OptionsConfig;
  dropdownConfig?: DropdownComponentProps;
}

const DropdownFormFieldComponent = forwardRef<HTMLDivElement, DropdownFormFieldType>(
  (
    { value, onChange, options: initOptions, optionsConfig, dropdownConfig, currentOptionsState },
    ref,
  ) => {
    const options = useFormOptions(initOptions, optionsConfig, currentOptionsState);
    const { t } = useTranslation();
    return (
      options && (
        <Dropdown
          {...dropdownConfig}
          ref={ref}
          value={value}
          options={options.map((option) => ({ ...option, label: t(option.label || '') }))}
          onChange={onChange}
        />
      )
    );
  },
);

export const DropdownFormField = DropdownFormFieldComponent;
