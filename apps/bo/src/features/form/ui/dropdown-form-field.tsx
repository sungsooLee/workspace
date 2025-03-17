import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import { BaseFormFieldProps, OptionsConfig } from '@learnway/hooks';
import { DropdownList, DropdownOption, SelectOption } from '@learnway/ui';
import { useFetchCodeGroups } from '../../../entities/platform';
import { t } from 'i18next';
import { ActionMeta, MultiValue, SingleValue } from 'react-select';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';

interface DropdownFormField extends BaseFormFieldProps<string> {
  options: SelectOption[];
  optionsConfig?: OptionsConfig;
}

const DropdownFormFieldComponent = forwardRef<HTMLDivElement, DropdownFormField>(
  ({ control, value, onChange, options: initOptions, optionsConfig }, ref) => {
    const [options, setOptions] = useState<SelectOption[]>([]);
    const { data: codeData } = useFetchCodeGroups();
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const watchedValue = useWatch({
      control,
      name: optionsConfig?.target || '',
    });

    const selectedOption = useMemo<SelectOption>(() => {
      if (!options) return { value: '', label: '' };
      const selected = options.find((option) => option.value === value);
      return selected || { value: '', label: '' };
    }, [value, options]);

    const init = async () => {
      if (!optionsConfig) {
        setOptions(initOptions);
        return;
      }
      let newOptions = [...initOptions];
      if (optionsConfig.type === 'self') {
        if (optionsConfig.codeGroup) {
          const codes = (codeData as any)[optionsConfig.codeGroup]?.codes || [];
          newOptions = [
            ...newOptions,
            ...codes.map((code: any) => ({
              ...code,
              value: code.code,
              label: t(code.name || ''),
            })),
          ];
        } else if (optionsConfig.api) {
          const result = await queryClient.fetchQuery(optionsConfig.api());
          // callback이 있으면 적용, 없으면 그대로 추가
          newOptions = optionsConfig.callback
            ? [...newOptions, ...optionsConfig.callback(result)]
            : Array.isArray(result)
              ? [...newOptions, ...result]
              : (() => {
                  console.error('The response is not an array; a callback function is required.');
                  return newOptions;
                })();
        }
      } else if (optionsConfig.type === 'target' && watchedValue) {
        if (optionsConfig.options) {
          newOptions = [...optionsConfig.options];
        }
        // target 타입의 경우: watchedValue에 따라 아이템 변경
        if (optionsConfig.codeGroup) {
          const parentCodes = (codeData as any)[optionsConfig.codeGroup]?.codes || [];
          const findParent = (
            parentCodes.find((pc: any) => pc.code === watchedValue)?.codes || []
          ).map((code: any) => ({ value: code.code, label: code.name }));
          newOptions = [...newOptions, ...findParent];
        } else if (optionsConfig.api) {
          const result = await queryClient.fetchQuery(optionsConfig.api(watchedValue));

          // callback이 있으면 적용, 없으면 그대로 추가
          newOptions = optionsConfig.callback
            ? [...newOptions, ...optionsConfig.callback(result)]
            : Array.isArray(result)
              ? [...newOptions, ...result]
              : (() => {
                  console.error('The response is not an array; a callback function is required.');
                  return newOptions;
                })();
        }
      }
      setOptions(newOptions);
    };

    const handleSelectedChange = (
      newValue: SingleValue<DropdownOption> | MultiValue<DropdownOption>,
      _: ActionMeta<DropdownOption>,
    ) => {
      const singleValue = newValue as SingleValue<DropdownOption>;
      if (singleValue) {
        onChange(singleValue.value);
      }
    };

    useEffect(() => {
      init();
    }, [watchedValue]);

    return (
      options &&
      options.length > 0 && (
        <DropdownList
          ref={ref}
          value={selectedOption}
          options={options}
          onChange={handleSelectedChange}
        />
      )
    );
  },
);

export const DropdownFormField = DropdownFormFieldComponent;
