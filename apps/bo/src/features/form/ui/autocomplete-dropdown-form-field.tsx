import React, { forwardRef, useEffect, useState } from 'react';
import { BaseFormFieldProps, OptionsConfig, SelectOption, useFormOptions } from '@learnway/hooks';
import { AutoCompleteDropdown, Dropdown, DropdownComponentProps } from '@learnway/ui';

interface DropdownFormFieldType extends BaseFormFieldProps<string> {
  options?: SelectOption[];
  optionsConfig?: OptionsConfig;
  dropdownConfig?: DropdownComponentProps;
  labelField?: string;
  valueField?: string;
}

const AutoCompleteDropdownFormFieldComponent = forwardRef<HTMLDivElement, DropdownFormFieldType>(
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
    const [selectedOption, setSelectedOption] = useState<SelectOption | undefined>(undefined);

    const options = useFormOptions(initOptions, optionsConfig, currentOptionsState);

    useEffect(() => {
      const option = options?.find((option) => option.value === value);
      setSelectedOption(option);
    }, [value, options]);

    const handleRoleLoadOptions = async (searchText: string): Promise<any[]> => {
      const reg = new RegExp(searchText, 'i'); // 대소문자 구분 없이 검색하려면 'i' 옵션 추가
      const filteredList = options?.filter((option) => reg.test(option.label));

      if (filteredList) {
        return filteredList;
      } else if (options) {
        return options;
      }
      return [];
    };

    return (
      <AutoCompleteDropdown
        {...props}
        {...dropdownConfig}
        ref={ref}
        value={selectedOption?.label}
        defaultOptions={options}
        onChange={(value) => {
          const option = options?.find((option) => option.value === value);
          setSelectedOption(option);
          onChange?.(value);
        }}
        loadOptions={handleRoleLoadOptions}
      />
    );
  },
);

export const AutoCompleteDropdownFormField = AutoCompleteDropdownFormFieldComponent;
