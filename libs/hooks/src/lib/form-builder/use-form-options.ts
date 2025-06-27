import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useCodeStore } from '../use-code-store/use-code-store';
import { OptionsConfig, SelectOption } from './type';
import { CODE_GROUP } from '../use-code-store/constants';
import { getMockOption } from '@learnway/shared';

/**
 * Form 에서 CodeGroup에 대한 로딩을 위한 커스텀 훅
 * @param options - 정적 옵션 배열 (선택사항)
 * @param optionsConfig - 동적 옵션 설정 (선택사항)
 * @param currentOptionsState - 외부에서 관리할 옵션 상태 (선택사항)
 * @param labelField - 라벨 필드명 (기본값: 'label')
 * @param valueField - 값 필드명 (기본값: 'value')
 */
const useFormOptionsHook = (
  options?: SelectOption[],
  optionsConfig?: OptionsConfig,
  currentOptionsState?: [SelectOption[], (options: SelectOption[]) => void],
) => {
  // 내부 옵션 상태 관리 (외부 상태가 없을 때 사용)
  const internalOptionsState = useState<SelectOption[]>([]);
  // 외부 상태가 있으면 사용하고, 없으면 내부 상태 사용
  const [currentOptions, setCurrentOptions] = currentOptionsState || internalOptionsState;

  // 코드 스토어와 번역 훅 가져오기
  const { getCode } = useCodeStore();
  const { t } = useTranslation();

  /**
   * 옵션에 번역을 적용하는 함수 (codeGroup용)
   * @param options - 번역할 옵션 배열
   * @returns 번역이 적용된 옵션 배열
   */
  const applyTranslation = (options: SelectOption[]): SelectOption[] => {
    return options.map((option) => ({
      ...option,
      label: t(option.label || ''),
    }));
  };

  /**
   * 필드 매핑을 적용하는 함수
   * @param options - 매핑할 옵션 배열
   * @returns 필드 매핑이 적용된 옵션 배열
   */
  const applyFieldMapping = useCallback(
    (options: any[]): SelectOption[] => {
      return options.map((option) => ({
        ...option,
        label: option[optionsConfig?.labelField || 'label'] || option.label || '',
        value: option[optionsConfig?.valueField || 'value'] || option.value || '',
      }));
    },
    [optionsConfig?.labelField, optionsConfig?.valueField],
  );

  /**
   * CodeGroup에서 옵션을 가져오는 함수
   * @param codeGroup - 코드 그룹명
   * @returns 코드 그룹에서 가져온 옵션 배열
   */
  const getCodeGroupOptions = async (codeGroup: string): Promise<SelectOption[]> => {
    // mock code group
    if (
      ['test', CODE_GROUP['mock.options.use'], CODE_GROUP['mock.options.possible']].includes(
        codeGroup,
      )
    ) {
      return getMockOption(codeGroup);
    }

    // optionsConfig > options 에 등록된 값은 조회와 상관없이 앞에 선언 됩니다.
    const optionConfigOptions: SelectOption[] = optionsConfig?.options || [];
    const codeStoreOptions = await getCode(codeGroup);
    const allOptions = [...optionConfigOptions, ...codeStoreOptions];
    const mappedOptions = applyFieldMapping(allOptions);
    return applyTranslation(mappedOptions);
  };

  /**
   * API에서 옵션을 가져오는 함수
   * @param api - API 설정 객체
   * @returns API에서 가져온 옵션 배열
   */
  const getApiOptions = async (api: OptionsConfig['api']): Promise<SelectOption[]> => {
    if (!api || api.enabled === false) return [];
    const { fn, params, select } = api;
    const apiOptions = await fn(params);
    const newOptions = select ? select(apiOptions) : apiOptions;
    return applyFieldMapping(newOptions);
  };

  /**
   * options 가 없고 optionsConfig 가 있을때만 작동
   * 동적 옵션 초기화 함수
   */
  const initOptionConfig = async () => {
    if (!optionsConfig) {
      return;
    }

    let resultOptions: SelectOption[] = [];

    // 코드 그룹에서 옵션 가져오기
    if (optionsConfig.codeGroup) {
      resultOptions = await getCodeGroupOptions(optionsConfig.codeGroup);
    }
    // API에서 옵션 가져오기
    else if (optionsConfig.api) {
      resultOptions = await getApiOptions(optionsConfig.api);
    }

    // 옵션 변환 함수가 있으면 적용
    if (optionsConfig.transformOptions) {
      resultOptions = optionsConfig.transformOptions(resultOptions);
    }

    setCurrentOptions(resultOptions);
  };

  // 컴포넌트 마운트 시 동적 옵션 초기화
  useEffect(() => {
    if (!options && optionsConfig) {
      initOptionConfig();
    }
  }, []);

  // 정적 옵션이 변경될 때마다 필드 매핑 적용
  useEffect(() => {
    if (options) {
      const mappedOptions = applyFieldMapping(options);
      setCurrentOptions(mappedOptions);
    }
  }, [options?.length]);

  return currentOptions;
};

export const useFormOptions = useFormOptionsHook;
