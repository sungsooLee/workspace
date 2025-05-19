import { OptionsConfig, SelectOption, UseFormOptionsProps } from './type';
import { useEffect, useState } from 'react';
import { useCodeStore } from '../use-code-store/use-code-store';

/**
 * Form 에서 CodeGroup에 대한 로딩을 위한 커스텀 훅
 * @param options
 * @param optionsConfig
 */
const useFormOptionsHook = (options?: SelectOption[], optionsConfig?: OptionsConfig) => {
  const [currentOptions, setCurrentOptions] = useState<SelectOption[]>([]);
  const { getCode } = useCodeStore();
  /**
   * options 가 없고 optionsConfig 가 있을때만 작동
   */
  const initOptionConfig = async () => {
    if (!optionsConfig) return;
    // ontionsConfig > options 에 등록된 값은 조회와 상관없이 앞에 선언 됩니다.
    let optionConfigOptions: SelectOption[] = optionsConfig.options || [];
    if (optionsConfig.codeGroup) {
      const codeStoreOptions = await getCode(optionsConfig.codeGroup);
      optionConfigOptions = [...optionConfigOptions, ...codeStoreOptions];
    }
    setCurrentOptions(optionConfigOptions);
  };

  useEffect(() => {
    if (!options && optionsConfig) {
      initOptionConfig();
    }
  }, []);
  useEffect(() => {
    if (options) {
      setCurrentOptions(options);
    }
  }, [options]);
  return currentOptions;
};

export const useFormOptions = useFormOptionsHook;
