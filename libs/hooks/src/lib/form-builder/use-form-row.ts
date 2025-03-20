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

export const useFormRow = (provider: DynamicFormProvider, children: ReactNode, name?: string) => {
  const { control, builders, formState, fieldRefs, ...providerProps } = provider;

  // children에서 name 값을 수집
  const names = useMemo(() => collectNames(children), [children]);

  // 명시적으로 지정된 name이 없으면 첫 번째 필드의 name 사용
  const formName = name || names[0];

  // 필드의 빌더 설정 가져오기
  const rootConfig = getBuilderConfig(builders, formName);

  // 필드가 필수인지 확인
  const isRequired = control.isFieldRequired(formName);

  // 상태값 설정
  const [error, setError] = useState<ErrorState>({ isError: false });
  const [guideText, onChangeGuideText] = useState<string>('');
  const [infoArea, onChangeInfoArea] = useState<ReactNode | null>(null);

  const renderFormRowContent = (child: ReactNode, formFieldConfig: FormFieldConfig): ReactNode => {
    if (!isValidElement(child)) return child;

    if ((child.type as any).displayName === 'DynamicFormField') {
      const formConfig = getBuilderConfig(provider.builders, child.props.name);

      const FormComponent = formFieldConfig[formConfig.type as keyof typeof formFieldConfig];

      // 단일 필드로 감싸는 방식: cloneElement를 사용해 추가 props를 병합.
      return cloneElement(child, {
        key: child.props.name,
        ...formConfig, // 빌더 설정값 (예: label, description 등)
        ...providerProps, // provider에서 전달받은 추가 props들
        onChangeGuideText,
        onChangeInfoArea,
        control, // react-hook-form control
        name: child.props.name, // 기존의 name prop 유지
        component:
          FormComponent ||
          // FormComponent가 없으면 fallback: child의 children을 클론하여 Controller에서 전달받은 props 병합
          ((fallbackProps: any) => {
            if (isValidElement(child.props.children)) {
              return cloneElement(child.props.children, {
                ...fallbackProps,
                ...child.props.children.props,
              });
            }
            return child.props.children;
          }),
      } as any);
    }

    if (child.props?.children) {
      // 재귀 호출 시 props.children 사용 → children 참조 방지
      return cloneElement(child as ReactElement, {
        children: Children.map(child.props.children, (nestedChild) =>
          renderFormRowContent(nestedChild, formFieldConfig),
        ),
      });
    }

    return child;
  };

  useEffect(() => {
    // 필드별 에러 상태 파싱
    const errorList = names
      .filter((fieldName) => formState.errors[fieldName])
      .map((fieldName) => formState.errors[fieldName]);

    let errorMessage: string | undefined;
    if (errorList.length > 0) {
      const message = errorList[0]?.message;
      // message가 string인지 확인 후 indexOf 사용
      if (typeof message === 'string') {
        errorMessage = message;

        if (errorMessage.indexOf('{{label}}') > -1 && rootConfig.label) {
          errorMessage = errorMessage.replace('{{label}}', rootConfig.label);
        }
      }
    }

    setError({
      isError: !!errorMessage,
      message: errorMessage,
    });
  }, [formState.errors, names, rootConfig.label]);
  return {
    fieldRefs,
    formName,
    rootConfig,
    isRequired,
    error,
    guideText,
    infoArea,
    renderFormRowContent,
  };
};
