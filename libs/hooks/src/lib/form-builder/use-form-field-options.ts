import { useState } from 'react';
import { SelectOption } from './type';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { useWatch } from 'react-hook-form';
export interface DropdownOption {
  value: string;
  label?: string;
}
/**
 * checkbox group, raio-group, dropdown 의 options를 세팅하는
 */
const useFormBuilderOptionsHook = ({ codeData, control, optionConfig }: any) => {
  /*const [options, setOptions] = useState<DropdownOption[]>([]);
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const filterWatchedValue = useWatch({
    control,
    name: optionsConfig?.filter?.target || '',
  });
  const watchedValue = useWatch({
    control,
    name: optionsConfig?.target || '',
  });

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
    if (
      filterWatchedValue &&
      optionsConfig?.filter &&
      filterWatchedValue === optionsConfig.filter.value
    ) {
      const filterOptions = optionsConfig.filter.fn(newOptions as SelectOption[]);
      const currentValue = filterOptions.find((option: SelectOption) => option.value === value);
      if (!currentValue) {
        onChange(filterOptions[0]?.value);
      }
      setOptions(filterOptions);
    } else {
      setOptions(newOptions);
    }
  };

  useEffect(() => {
    init();
  }, [watchedValue, filterWatchedValue]);*/
  return {};
};

export const useFormFieldOptions = useFormBuilderOptionsHook;
