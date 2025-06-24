import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCodeStore } from '../use-code-store/use-code-store';
import { OptionsConfig, SelectOption } from './type';

/**
 * Form 에서 CodeGroup에 대한 로딩을 위한 커스텀 훅
 * @param options
 * @param optionsConfig
 * @param currentOptionsState
 * @param labelField
 * @param valueField
 */
const useFormOptionsHook = (
  options?: SelectOption[],
  optionsConfig?: OptionsConfig,
  currentOptionsState?: [SelectOption[], (options: SelectOption[]) => void],
  labelField = 'label',
  valueField = 'value',
) => {
  const internalOptionsState = useState<SelectOption[]>([]);
  const [currentOptions, setCurrentOptions] = currentOptionsState || internalOptionsState;
  const { getCode } = useCodeStore();
  const { t } = useTranslation();

  /**
   * 옵션에 번역을 적용하는 함수 (codeGroup용)
   */
  const applyTranslation = (options: SelectOption[]): SelectOption[] => {
    return options.map((option) => ({
      ...option,
      label: t(option.label || ''),
    }));
  };

  /**
   * 필드 매핑을 적용하는 함수
   */
  const applyFieldMapping = (options: any[]): SelectOption[] => {
    return options.map((option) => ({
      ...option,
      label: option[labelField] || option.label || '',
      value: option[valueField] || option.value || '',
    }));
  };

  /**
   * CodeGroup에서 옵션을 가져오는 함수
   */
  const getCodeGroupOptions = async (codeGroup: string): Promise<SelectOption[]> => {
    // optionsConfig > options 에 등록된 값은 조회와 상관없이 앞에 선언 됩니다.
    const optionConfigOptions: SelectOption[] = optionsConfig?.options || [];
    const codeStoreOptions = await getCode(codeGroup);
    const allOptions = [...optionConfigOptions, ...codeStoreOptions];
    const mappedOptions = applyFieldMapping(allOptions);
    return applyTranslation(mappedOptions);
  };

  /**
   * API에서 옵션을 가져오는 함수
   */
  const getApiOptions = async (api: OptionsConfig['api']): Promise<SelectOption[]> => {
    if (!api) return [];
    const { fn, params } = api;
    const apiOptions = await fn(params);
    return applyFieldMapping(apiOptions);
  };

  /**
   * options 가 없고 optionsConfig 가 있을때만 작동
   */
  const initOptionConfig = async () => {
    if (!optionsConfig) {
      return;
    }

    let resultOptions: SelectOption[] = [];

    if (optionsConfig.codeGroup) {
      resultOptions = await getCodeGroupOptions(optionsConfig.codeGroup);
    } else if (optionsConfig.api) {
      resultOptions = await getApiOptions(optionsConfig.api);
    }

    setCurrentOptions(resultOptions);
  };

  useEffect(() => {
    if (!options && optionsConfig) {
      initOptionConfig();
    }
  }, []);

  useEffect(() => {
    if (options) {
      const mappedOptions = applyFieldMapping(options);
      setCurrentOptions(mappedOptions);
    }
  }, [options?.length, labelField, valueField]);

  return currentOptions;
};

export const useFormOptions = useFormOptionsHook;
