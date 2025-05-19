import { SelectOption, UseFormOptionsProps } from './type';
import { useEffect, useState } from 'react';
import { useCodeStore } from '../code/use-code-store';

const useFormOptionsHook = ({ options, optionsConfig }: UseFormOptionsProps) => {
  const [currentOptions, setCurrentOptions] = useState<SelectOption[]>([]);
  const { getCode } = useCodeStore();
  const initOptionConfig = async () => {
    console.log('initOptionConfig');
    if (!optionsConfig) return;
    let optionConfigOptions: SelectOption[] = optionsConfig.options || [];
    if (optionsConfig.codeGroup) {
      const codeStoreOptions = await getCode(optionsConfig.codeGroup);
      optionConfigOptions = [...optionConfigOptions, ...codeStoreOptions];
    }
    setCurrentOptions(optionConfigOptions);
  };

  useEffect(() => {
    if (options) {
      setCurrentOptions(options);
    } else if (!options && optionsConfig) {
      initOptionConfig();
    }
  }, []);
  return currentOptions;
};

export const useFormOptions = useFormOptionsHook;
