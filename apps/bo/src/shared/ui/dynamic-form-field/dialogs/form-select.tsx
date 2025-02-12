import { FC, useEffect, useCallback, useRef, useState } from 'react';
import { useFetchCodeGroups } from '../../../../entities/platform';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { Select, SelectOption } from '@learnway/ui';

const FormSelectComponent: FC<any> = ({ optionsConfig, watch, options, value, onChange, name }) => {
  const [currentOptions, setCurrentOptions] = useState<SelectOption[]>(
    options.map((option: any) =>
      option.value === '' ? { ...option, value: 'selected-empty' } : { ...option },
    ),
  );
  const { data: codeData } = useFetchCodeGroups();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const watchedValue =
    optionsConfig && optionsConfig.type === 'target' ? watch(optionsConfig.target) : null;
  // 아이템 초기화 및 업데이트 함수 (self, target 둘 다 처리)
  const loadOptions = useCallback(async () => {
    try {
      if (!optionsConfig) return;

      let newOptions: SelectOption[] = [...options]; // 기본 아이템 유지
      if (optionsConfig.type === 'self') {
        // self 타입의 경우: codeGroup 또는 API 처리
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

      setCurrentOptions(
        newOptions.map((option) =>
          option.value === '' ? { ...option, value: 'selected-empty' } : { ...option },
        ),
      );
      // 처음 로드 시, 첫 번째 값을 기본값으로 설정 (onChange 호출)
      onChange('');
    } catch (error) {
      console.error('Failed to load options:', error);
    }
  }, [optionsConfig, options, codeData, watchedValue, t, queryClient]);

  const handleSelectChange = (selectedValue?: SelectOption) => {
    if (selectedValue) {
      onChange(selectedValue.value === 'selected-empty' ? '' : selectedValue.value);
    }
  };

  // `optionsConfig` 초기 세팅 로직
  useEffect(() => {
    loadOptions();
  }, [optionsConfig, watchedValue]);
  return (
    <>
      <Select value={value} onChange={handleSelectChange} options={currentOptions} />
    </>
  );
};

export const FormSelect = FormSelectComponent;
