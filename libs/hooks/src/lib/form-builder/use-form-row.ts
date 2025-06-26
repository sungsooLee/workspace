import {
  useMemo,
  useState,
  useEffect,
  ReactNode,
  Children,
  isValidElement,
  cloneElement,
  ReactElement,
} from 'react';
import { useTranslation } from 'react-i18next';
import { DynamicFormProvider, ErrorState, FormConfig, FormFieldConfig } from './type';

/**
 * getBuilderConfig
 * -------------------------------------------------------------------
 * 주어진 빌더(builder) 배열에서 필드 이름(name)을 기반으로
 * 설정 객체(config)를 재귀적으로 찾아 반환.
 *
 * - name은 점(.)으로 구분된 문자열(예: "userInfos.0.user-name")이며,
 *   배열 인덱스(숫자)는 무시.
 * - 최상위 필드(부모)가 object 또는 array 타입이면,
 *   자식 필드의 라벨 대신 부모의 라벨을 사용.
 *
 * @param builders - 최상위 빌더 배열
 * @param name - 점(.)으로 구분된 필드 이름
 * @returns { config: Partial<Builder> }
 */
const getBuilderConfig = (builders: FormConfig[], name: string): Partial<FormConfig> => {
  if (!name) {
    return {};
  }
  // name을 '.' 기준으로 분할.
  const parts = name.split('.');
  let parentConfig: Partial<any> | undefined;
  let currentConfig: Partial<any> | undefined;
  let currentBuilders = builders;

  parts.forEach((part, index) => {
    // 숫자인 경우(배열 인덱스)는 건너뜁니다.
    if (!isNaN(Number(part))) return;
    const found = currentBuilders.find((b) => b.name === part);
    if (!found) return;
    // 첫 번째 발견된 필드가 최상위(부모) 필드입니다.
    if (index === 0) {
      parentConfig = found;
    }
    currentConfig = found;
    // 다음 자식 필드 목록으로 업데이트.
    if (found.type === 'object' || found.type === 'array') {
      currentBuilders = found?.fields || [];
    }
  });

  // 부모가 object 또는 array 타입인 경우, 자식 필드의 라벨 대신 부모 라벨 사용
  if (
    parentConfig &&
    (parentConfig.type === 'object' || parentConfig.type === 'array') &&
    currentConfig
  ) {
    if (!currentConfig.label) {
      currentConfig.label = parentConfig.label;
    }
  }
  return currentConfig || {};
};

/**
 * collectNames
 * -------------------------------------------------------------------
 * 주어진 children 내부를 재귀적으로 순회하여, DynamicFormField 컴포넌트에
 * 지정된 name 값을 수집.
 *
 * @param children - ReactNode (children)
 * @returns 수집된 name 문자열 배열
 */
const collectNames = (children: ReactNode): string[] => {
  const names: string[] = [];
  const traverse = (child: ReactNode) => {
    if (!isValidElement(child)) return;
    // DynamicFormField인 경우 name 값을 수집
    if ((child.type as any).displayName === 'DynamicFormField') {
      names.push(child.props.name);
    }
    // 자식이 있으면 재귀적으로 순회
    if (child.props.children) {
      Children.forEach(child.props.children, traverse);
    }
  };
  Children.forEach(children, traverse);
  return names;
};

export const useFormRow = (
  provider: DynamicFormProvider,
  children: ReactNode,
  name: string,
  fieldConfig?: FormConfig,
) => {
  const { control, builders, formState, fieldRefs, ...providerProps } = provider;
  const { t } = useTranslation();

  // fieldConfig가 제공되면 우선 사용, 그렇지 않으면 기존 방식대로 builders에서 찾기
  const formConfig = fieldConfig || getBuilderConfig(provider.builders, name);

  // 필드가 필수인지 확인
  const isRequired = control.isFieldRequired(name);

  // 상태값 설정
  const [error, setError] = useState<ErrorState>({ isError: false });

  useEffect(() => {
    // 필드별 에러 상태 파싱
    const message = formState.errors[name]?.message;
    let errorMessage = '';
    // message가 string인지 확인 후 indexOf 사용
    if (typeof message === 'string') {
      errorMessage = message;

      if (errorMessage.indexOf('{{label}}') > -1 && formConfig.label) {
        errorMessage = errorMessage.replace('{{label}}', t(formConfig.label));
      }
    }
    setError({
      isError: !!errorMessage,
      message: errorMessage,
    });
  }, [formState]);

  return {
    fieldRefs,
    formConfig,
    isRequired,
    error,
  };
};
