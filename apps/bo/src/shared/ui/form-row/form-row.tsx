import {
  Children,
  cloneElement,
  FC,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { cn } from '@learnway/shared';
import styles from './form.module.css';
import { IcoFormRequired } from '@learnway/icons';
import { Builder, DynamicFormField } from '../dynamic-form-field';
import { dialogConfig } from './config';
import { FormRowProps } from './type';

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
const getBuilderConfig = (builders: any[], name: string): Partial<Builder> => {
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
    currentBuilders = found.fields || [];
  });

  // 부모가 object 또는 array 타입인 경우, 자식 필드의 라벨 대신 부모 라벨 사용
  if (
    parentConfig &&
    (parentConfig.type === 'object' || parentConfig.type === 'array') &&
    currentConfig
  ) {
    currentConfig.label = parentConfig.label;
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
const collectNames = (children: React.ReactNode): string[] => {
  const names: string[] = [];
  const traverse = (child: React.ReactNode) => {
    if (!isValidElement(child)) return;
    // DynamicFormField인 경우 name 값을 수집
    if (child.type === DynamicFormField) {
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

/**
 * FormRowComponent
 * -------------------------------------------------------------------
 * - provider와 builder 설정을 기반으로 DynamicFormField들을 감싸며,
 *   레이블, 에러 메시지, 안내 텍스트 등 폼의 공통 레이아웃을 구성.
 * - 내부에서 children을 재귀적으로 순회하면서 DynamicFormField에 추가 props
 *   (control, component 등)를 주입.
 *
 * @param className - 추가 CSS 클래스
 * @param provider - react-hook-form 및 빌더 관련 프로바이더 객체
 * @param children - 폼 필드들 (DynamicFormField 포함)
 * @param name - 명시적으로 지정한 name (없으면 내부의 첫번째 DynamicFormField의 name 사용)
 */
const FormRowComponent: FC<FormRowProps> = ({ className, provider, children, name }) => {
  // provider에서 필요한 값들을 구조분해
  const { control, builders, formState, ...providerProps } = provider;

  // children 내부의 DynamicFormField들의 name 값을 useMemo로 한 번만 계산
  const names = useMemo(() => collectNames(children), [children]);
  // 명시적으로 name이 제공되지 않은 경우, 첫 번째 name을 사용.
  const formName = name || names[0];
  // 해당 필드의 빌더 설정을 가져옵니다.
  const rootConfig = getBuilderConfig(builders, formName);
  // 필드가 필수인지 여부 (control에 isFieldRequired 함수가 있다고 가정)
  const isRequired = control.isFieldRequired(formName);
  // 에러 상태를 관리하는 상태값 (초기: 에러 없음)
  const [error, setError] = useState<{ isError: boolean; message?: string }>({ isError: false });

  /**
   * renderChild
   * -----------------------------------------------------------------
   * 주어진 child(ReactNode)를 검사하여, 만약 DynamicFormField라면
   * 추가 props를 주입한 cloneElement를 반환.
   * 자식이 있다면 재귀적으로 처리.
   *
   * @param child - 처리할 ReactNode
   * @returns 처리된 ReactNode
   */
  const renderChild = (child: ReactNode): React.ReactNode => {
    if (!isValidElement(child)) return child;

    // DynamicFormField인 경우: 해당 필드의 설정에 따라 추가 props 주입
    if (child.type === DynamicFormField) {
      // 해당 필드의 빌더 설정 조회.
      const formConfig = getBuilderConfig(builders, child.props.name);
      // dialogConfig에서 해당 type에 맞는 FormComponent를 선택.
      const FormComponent = dialogConfig[formConfig.type as keyof typeof dialogConfig];
      // 단일 필드로 감싸는 방식: cloneElement를 사용해 추가 props를 병합.
      return cloneElement(child, {
        ...formConfig, // 빌더 설정값 (예: label, description 등)
        ...providerProps, // provider에서 전달받은 추가 props들
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

    // child가 자식 요소(children)를 가지고 있으면 재귀적으로 처리
    if (child.props.children) {
      return cloneElement(child as ReactElement, {
        children: Children.map(child.props.children, renderChild),
      });
    }

    // 특별히 처리할 필요가 없으면 그대로 반환
    return child;
  };

  // useEffect: formState.errors가 변경되면 에러 메시지를 파싱하여 state에 저장
  useEffect(() => {
    // names 배열에 해당하는 필드 중 에러가 있는 것들 필터링
    const errorList = names
      .filter((fieldName) => formState.errors[fieldName])
      .map((fieldName) => formState.errors[fieldName]);
    let errorMessage;
    if (errorList && errorList.length > 0) {
      errorMessage = errorList[0]?.message as string;
      // 에러 메시지에 '{{label}}'가 포함되어 있으면 빌더의 label로 대체
      if (errorMessage && errorMessage !== '' && errorMessage.indexOf('{{label}}') > -1) {
        errorMessage = errorMessage.replace(`{{label}}`, rootConfig.label || '');
      }
    }
    setError({
      isError: !!errorMessage,
      message: errorMessage,
    });
  }, [formState.errors]);

  return (
    <div className={cn(styles.form_item, className)}>
      {/* 레이블 렌더링 */}
      {rootConfig.label && (
        <label htmlFor={formName} className={cn(styles.form_label, 'dynamic-form-field-label')}>
          {rootConfig.label}
          {isRequired && (
            <span
              className={cn(styles.status, {
                [styles.error]: error.isError, // 에러 발생 시 에러 스타일 적용
                [styles.required]: !error.isError, // 에러가 없으면 필수 스타일 적용
              })}>
              <IcoFormRequired width={8} height={8} />
            </span>
          )}
        </label>
      )}

      {/* 입력 영역: children을 순회하며 필요한 변환(renderChild) 적용 */}
      <div className={styles.input_box}>{Children.map(children, renderChild)}</div>

      {/* 안내 텍스트 또는 에러 메시지 렌더링 */}
      {!error.isError && rootConfig?.description && (
        <p className={cn(styles.guide_text, 'dynamic-form-field-guide-text')}>
          {rootConfig.description}
        </p>
      )}
      {error.isError && (
        <p className={cn(styles.guide_text, styles.error, 'dynamic-form-field-error')}>
          {error.message}
        </p>
      )}
    </div>
  );
};

export const FormRow = FormRowComponent;
