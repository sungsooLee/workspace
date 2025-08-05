import { getMockCodeGroupOption } from '@learnway/shared';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CODE_GROUP } from '../use-code-store/constants';
import { useCodeStore } from '../use-code-store/use-code-store';
import { OptionsConfig, SelectOption } from './type';

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

  // optionsConfig의 안정적인 참조를 위한 메모이제이션
  const stableOptionsConfig = useMemo(
    () => optionsConfig,
    [
      optionsConfig?.codeGroup,
      optionsConfig?.api,
      optionsConfig?.labelField,
      optionsConfig?.valueField,
      optionsConfig?.transformOptions,
      optionsConfig?.options,
    ],
  );

  /**
   * 옵션에 번역을 적용하는 함수 (codeGroup용)
   * @param options - 번역할 옵션 배열
   * @returns 번역이 적용된 옵션 배열
   */
  const applyTranslation = useCallback(
    (options: SelectOption[]): SelectOption[] => {
      return options.map((option) => ({
        ...option,
        label: t(option.label || ''),
      }));
    },
    [t],
  );

  /**
   * 필드 매핑을 적용하는 함수
   * @param options - 매핑할 옵션 배열
   * @returns 필드 매핑이 적용된 옵션 배열
   */
  const applyFieldMapping = useCallback(
    (options: any[]): SelectOption[] => {
      const labelField = stableOptionsConfig?.labelField || 'label';
      const valueField = stableOptionsConfig?.valueField || 'value';

      return options.map((option) => ({
        ...option,
        label: option[labelField] || option.label || '',
        value: option[valueField] || option.value,
      }));
    },
    [stableOptionsConfig?.labelField, stableOptionsConfig?.valueField],
  );

  /**
   * CodeGroup에서 옵션을 가져오는 함수
   * @param codeGroup - 코드 그룹명
   * @returns 코드 그룹에서 가져온 옵션 배열
   */
  const getCodeGroupOptions = useCallback(
    async (codeGroup: string): Promise<SelectOption[]> => {
      // mock code group
      if (
        ['test', CODE_GROUP['mock.options.use'], CODE_GROUP['mock.options.possible']].includes(
          codeGroup,
        )
      ) {
        const mockOptions = getMockCodeGroupOption(codeGroup);
        return applyFieldMapping(mockOptions);
      }

      // optionsConfig > options 에 등록된 값은 조회와 상관없이 앞에 선언 됩니다.
      const optionConfigOptions: SelectOption[] = stableOptionsConfig?.options || [];
      const codeStoreOptions = await getCode(codeGroup);
      const allOptions = [...optionConfigOptions, ...codeStoreOptions];
      const mappedOptions = applyFieldMapping(allOptions);
      return applyTranslation(mappedOptions);
    },
    [getCode, applyFieldMapping, applyTranslation, stableOptionsConfig?.options],
  );

  /**
   * API에서 옵션을 가져오는 함수
   * @param api - API 설정 객체
   * @returns API에서 가져온 옵션 배열
   */
  const getApiOptions = useCallback(
    async (api: OptionsConfig['api']): Promise<SelectOption[]> => {
      if (!api || api.enabled === false) {
        return [];
      }
      const { fn, select } = api;
      const apiOptions = await fn();
      const newOptions = select ? select(apiOptions) : apiOptions;
      return applyFieldMapping(newOptions);
    },
    [applyFieldMapping],
  );

  /**
   * options 가 없고 optionsConfig 가 있을때만 작동
   * 동적 옵션 초기화 함수
   */
  const initOptionConfig = useCallback(async () => {
    if (!stableOptionsConfig) {
      return;
    }

    let resultOptions: SelectOption[] = [];

    // 코드 그룹에서 옵션 가져오기
    if (stableOptionsConfig.codeGroup) {
      resultOptions = await getCodeGroupOptions(stableOptionsConfig.codeGroup);
    }
    // API에서 옵션 가져오기
    else if (stableOptionsConfig.api) {
      resultOptions = await getApiOptions(stableOptionsConfig.api);
    }

    // 옵션 변환 함수가 있으면 적용
    if (stableOptionsConfig.transformOptions) {
      resultOptions = stableOptionsConfig.transformOptions(resultOptions);
    }

    setCurrentOptions(resultOptions);
  }, [stableOptionsConfig, getCodeGroupOptions, getApiOptions, setCurrentOptions]);

  // 컴포넌트 마운트 시 동적 옵션 초기화
  useEffect(() => {
    if (!options && stableOptionsConfig) {
      initOptionConfig();
    }
  }, [options, stableOptionsConfig, initOptionConfig]);

  // 정적 옵션이 변경될 때마다 필드 매핑 적용
  useEffect(() => {
    if (options) {
      const mappedOptions = applyFieldMapping(options);
      setCurrentOptions(mappedOptions);
    }
  }, [options, applyFieldMapping, setCurrentOptions]);

  return currentOptions;
};

export const useFormOptions = useFormOptionsHook;
