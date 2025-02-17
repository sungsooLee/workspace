import { cloneElement, FC, isValidElement, ReactElement } from 'react';
import { dialogConfig } from './config';
import styles from './form.module.css';
import { cn } from '@learnway/shared';
import { IcoFormRequired } from '@learnway/icons';
import { Controller } from 'react-hook-form';
import { Builder, DynamicFormFieldProps, FormParams } from './type';


/**
 * 에러 객체에서 첫 번째 메시지를 재귀적으로 추출하는 함수
 * @param error - 에러 객체 (중첩 가능)
 * @returns 첫 번째로 발견된 에러 메시지 (없으면 빈 문자열)
 */
function getFirstErrorMessage(error: any): string {
  if (!error || typeof error !== 'object') return '';
  // 현재 객체에 message가 있으면 바로 반환
  if (typeof error.message === 'string' && error.message.trim() !== '') {
    return error.message;
  }
  // message가 없는 경우 내부 객체를 순회
  for (const key in error) {
    if (Object.prototype.hasOwnProperty.call(error, key)) {
      const nestedMessage = getFirstErrorMessage(error[key]);
      if (nestedMessage) return nestedMessage;
    }
  }
  return '';
}

/**
 * 특정 필드(fieldKey)의 에러 객체에서 에러 메시지를 추출하는 함수.
 *
 * 1. 먼저 errors[fieldKey]가 존재하는지 확인합니다.
 * 2. 만약 바로 message 속성이 있으면 그 값을 반환합니다.
 * 3. 그렇지 않다면, 해당 객체 내부에서 재귀적으로 첫 번째 메시지를 찾아 반환합니다.
 *
 * @param errors - 전체 에러 객체
 * @param fieldKey - 특정 필드의 키 (예: "eLeaning" 또는 "lowerGubun")
 * @returns 해당 필드의 에러 메시지 (없으면 빈 문자열)
 */
function getErrorMessageForField(errors: any, fieldKey: string): string {
  if (!errors || typeof errors !== 'object') return '';
  const fieldError = errors[fieldKey];
  if (!fieldError) return '';
  if (typeof fieldError.message === 'string' && fieldError.message.trim() !== '') {
    return fieldError.message;
  }
  // 직접 message가 없으면, 해당 필드 에러 객체 내부에서 첫번째 메시지를 찾음.
  return getFirstErrorMessage(fieldError);
}


/**
 * getBuilderConfig 함수
 * - 점(.)으로 구분된 필드 이름에서, 배열 인덱스는 건너뛰고
 *   설정 객체를 재귀적으로 탐색합니다.
 * - 만약 최상위 필드(부모)가 object 또는 array 타입이면,
 *   자식 필드의 라벨 대신 부모의 라벨을 사용합니다.
 * - 현재 설정과 최상위 필드의 이름을 함께 반환합니다.
 *
 * @param builders - 최상위 builder 배열
 * @param name - 점(.)으로 구분된 필드 이름 (예: "userInfos.0.user-name")
 * @returns { config: Partial<Builder>, topLevelName: string }
 */
const getBuilderConfig = (builders: Builder[], name: string): Partial<Builder> => {
  // nameParts 예: ["lowerGubun", "gubun"]
  const parts = name.split('.');
  let parentConfig: Partial<Builder> | undefined;
  let currentConfig: Partial<Builder> | undefined;
  let currentBuilders = builders;

  parts.forEach((part, index) => {
    // 배열 인덱스(숫자)는 건너뛰기
    if (!isNaN(Number(part))) return;
    const found = currentBuilders.find((b) => b.name === part);
    if (!found) return;
    // 첫 번째 찾은 필드가 최상위 필드(부모)
    if (index === 0) {
      parentConfig = found;
    }
    currentConfig = found;
    // 다음 단계로 내려갈 필드 목록 갱신 (자식 필드들)
    currentBuilders = found.fields || [];
  });

  // 부모가 object 또는 array 타입이면, 자식 필드의 라벨 대신 부모의 라벨 사용
  if (
    parentConfig &&
    (parentConfig.type === 'object' || parentConfig.type === 'array') &&
    currentConfig
  ) {
    currentConfig.label = parentConfig.label;
  }

  return {
    config: currentConfig || {},
    topLevelName: parentConfig ? parentConfig.name : '',
  };
};
/**
 * DynamicFormField 컴포넌트
 * - react-hook-form의 Controller를 사용하여 동적으로 폼 필드를 렌더링합니다.
 */
const DynamicFormFieldComponent: FC<DynamicFormFieldProps> = ({
                                                                provider,
                                                                name,
                                                                type,
                                                                disabled = false,
                                                                children,
                                                                ...props
                                                              }) => {
  const { control, builders, fieldRefs, watch, onFormChange, formData, onFocus } = provider;

  // 현재 필드에 해당하는 빌더 설정 정보 추출
  const { config: builderConfig, topLevelName } = getBuilderConfig(builders, name);
  const { type: configType, label, ...buildProps } = builderConfig;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref }, formState: { errors } }) => {
        // 현재 필드가 필수인지 여부 체크
        const isRequired = control.isFieldRequired(topLevelName);

        const hasError = !!errors[topLevelName];

        // dialogConfig에서 해당 타입의 컴포넌트를 선택 (type prop이 우선)
        const FormComponent = dialogConfig[(type || configType) as keyof typeof dialogConfig];

        // 폼 필드에 공통적으로 전달할 파라미터
        const formParams: FormParams = {
          watch,
          onFormChange,
          formData,
          onFocus,
          ref,
          type: configType || type,
          name,
          onChange,
          onBlur,
          disabled,
          ...buildProps,
          ...props, // 추가 props 전달
          value,
        };

        /**
         * 커스텀 onChange 핸들러
         * - onChange 호출 후 콘솔에 값을 출력합니다.
         * @param newValue - 업데이트된 값
         */
        const handleCustomDynamicFormOnChange = (newValue: any) => {
          onChange(newValue);
        };

        // children이 React 요소라면 formParams를 주입하여 클론 생성
        const ChildComponent = isValidElement(children)
          ? cloneElement(children as ReactElement, {
            ...formParams,
            value,
            onChange: handleCustomDynamicFormOnChange,
          })
          : null;

        return (
          <div className={styles.form_item}>
            {/* 레이블 렌더링 */}
            {label && (
              <label htmlFor={name} className={styles.form_label}>
                {label}
                {isRequired && (
                  <span
                    className={cn(styles.status, {
                      [styles.error]: hasError, // 에러가 있을 경우 에러 스타일 적용
                      [styles.required]: !hasError, // 에러가 없을 경우 필수 스타일 적용
                    })}>
                    <IcoFormRequired width={8} height={8} />
                  </span>
                )}
              </label>
            )}

            {/* 입력 영역 및 필드 참조 저장 */}
            <div className={styles.input_box} ref={(node) => (fieldRefs.current[name] = node)}>
              {/* children 컴포넌트 렌더링 (있다면) */}
              {/* dialogConfig에 등록된 동적 폼 컴포넌트 렌더링 */}
              {ChildComponent ? ChildComponent : FormComponent && <FormComponent {...formParams} />}
            </div>

            {/* 안내 텍스트 또는 에러 메시지 렌더링 */}
            {!hasError && formParams?.description && (
              <p className={cn(styles.guide_text)}>{formParams.description}</p>
            )}
            {hasError && (
              <p className={cn(styles.guide_text, styles.error)}>
                {getErrorMessageForField(errors, name)}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export const DynamicFormField = DynamicFormFieldComponent;
