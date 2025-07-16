import React, { FC, memo, ReactNode, useEffect, useMemo } from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { cn } from '@learnway/shared';
import boStyles from '@learnway/styles/bo/assets/styles/modules/form.module.css';
import foStyles from '@learnway/styles/fo/assets/styles/modules/form.module.css';
import { IcoFormRequired } from '@learnway/icons';
import { useTranslation } from 'react-i18next';
import { useAutoFormContext } from '@learnway/hooks';
import { Input } from '../input/input';

interface FormRow3Props {
  className?: string;
  name: string;
  label?: string;
  element?: ReactNode;
  control?: Control<any>; // 자동 모드에서는 선택적
  errors?: FieldErrors;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: (value: any, formValues?: any) => boolean | string;
  };
  placeholder?: string;
  style?: 'bo' | 'fo';
  guideText?: string;
  defaultValue?: any;
  fieldType?: 'text' | 'number' | 'boolean' | 'select' | 'date' | 'email' | 'tel' | 'textarea'; // 자동 필드 타입 추론용
}

const BaseFormRow3Component: FC<FormRow3Props> = ({
  className,
  name,
  label,
  element,
  control: propControl,
  errors = {},
  validation = {},
  placeholder,
  style = 'bo',
  guideText,
  defaultValue = '',
  fieldType = 'text',
}) => {
  const { t } = useTranslation();
  const styles = style === 'bo' ? boStyles : foStyles;

  const autoFormContext = useAutoFormContext();

  const control = propControl || autoFormContext?.control;

  // 필드 타입 자동 추론
  const inferredFieldType = useMemo(() => {
    if (fieldType !== 'text') return fieldType;

    if (placeholder?.toLowerCase().includes('email')) return 'email';
    if (placeholder?.toLowerCase().includes('tel') || placeholder?.toLowerCase().includes('연락처'))
      return 'tel';
    if (placeholder?.toLowerCase().includes('number') || name.toLowerCase().includes('code'))
      return 'number';
    if (typeof defaultValue === 'boolean') return 'boolean';
    if (typeof defaultValue === 'number') return 'number';

    return 'text';
  }, [fieldType, placeholder, name, defaultValue]);

  // 자동 폼 컨텍스트에 필드 등록
  useEffect(() => {
    if (autoFormContext && !autoFormContext.isInitialized) {
      autoFormContext.registerField({
        name,
        type: inferredFieldType,
        defaultValue,
        required: validation?.required,
      });

      return () => {
        autoFormContext.unregisterField(name);
      };
    }
  }, [autoFormContext, name, inferredFieldType, defaultValue, validation?.required]);

  // validation 규칙 설정
  const rules = useMemo(() => {
    const validationRules: any = {};

    if (validation.required) {
      validationRules.required = {
        value: true,
        message: `${label || name}은(는) 필수 입력 항목입니다.`,
      };
    }

    if (validation.minLength) {
      validationRules.minLength = {
        value: validation.minLength,
        message: `${label || name}은(는) 최소 ${validation.minLength}자 이상 입력해주세요.`,
      };
    }

    if (validation.maxLength) {
      validationRules.maxLength = {
        value: validation.maxLength,
        message: `${label || name}은(는) 최대 ${validation.maxLength}자까지 입력 가능합니다.`,
      };
    }

    if (validation.pattern) {
      validationRules.pattern = {
        value: validation.pattern,
        message: `${label || name} 형식이 올바르지 않습니다.`,
      };
    }

    if (validation.validate) {
      validationRules.validate = (value: any, formValues: any) => {
        const result = validation.validate!(value, formValues);
        if (result === false || typeof result === 'string') {
          return typeof result === 'string' ? result : `${label || name} 값이 유효하지 않습니다.`;
        }
        return true;
      };
    }

    return validationRules;
  }, [validation, label, name]);

  const finalPlaceholder = useMemo(() => {
    if (placeholder) return placeholder;
    if (label) return `${label}을(를) 입력하세요`;
    return undefined;
  }, [placeholder, label]);

  // 에러 상태: 실시간 formState 사용
  const formState = autoFormContext?.methods?.formState;
  const contextErrors = formState?.errors || autoFormContext?.formState?.errors || {};
  const propErrors = errors || {};

  // 자동 컨텍스트가 있으면 실시간 errors 우선, 아니면 prop errors 사용
  const activeErrors = autoFormContext ? contextErrors : propErrors;
  const fieldError = activeErrors[name];
  const hasError = !!fieldError;
  const isRequired = !!validation.required;

  if (!control) {
    return <div>폼 초기화 중... (Control이 없습니다: {name})</div>;
  }

  return (
    <div className={cn(styles.form_item, className)}>
      {/* 레이블 */}
      {label && (
        <label htmlFor={name} className={cn(styles.form_label, 'dynamic-form-field-label', 'flex')}>
          <span className={styles.form_text}>{label}</span>
          {isRequired && (
            <span
              className={cn(styles.status, {
                [styles.error]: hasError,
                [styles.required]: !hasError,
              })}
            >
              <IcoFormRequired width={8} height={8} />
            </span>
          )}
        </label>
      )}

      {/* 입력 영역 */}
      <div className={styles.input_box}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={defaultValue}
          render={({ field, fieldState }) => {
            // Controller의 fieldState.error와 외부 errors 중 우선순위
            const currentError = fieldState.error || activeErrors[name];
            const hasCurrentError = !!currentError;

            if (element) {
              // 컴포넌트 타입 감지
              const isDropdownComponent =
                React.isValidElement(element) &&
                element.type &&
                (typeof element.type === 'function' || typeof element.type === 'object') &&
                ((element.type as any).displayName?.includes('Dropdown') ||
                  (element.type as any).name?.includes('Dropdown') ||
                  element.props?.optionsConfig);

              // 강화된 onChange 핸들러
              const enhancedOnChange = (value: any, actionMeta?: any) => {
                // Dropdown의 경우 올바른 값 추출
                let finalValue = value;
                if (isDropdownComponent && value && typeof value === 'object' && 'value' in value) {
                  finalValue = value.value;
                }

                // 필드 값 업데이트
                field.onChange(finalValue);

                // 값이 변경되면 무조건 에러 클리어 시도
                if (autoFormContext?.methods) {
                  // 즉시 에러 클리어
                  autoFormContext.methods.clearErrors(name);

                  if (finalValue && finalValue !== '') {
                    setTimeout(() => {
                      autoFormContext.methods?.trigger(name);
                    }, 10);
                  }
                }
              };

              const elementProps = {
                ...field,
                name: field.name,
                value: field.value || '',
                onChange: enhancedOnChange,
                onBlur: field.onBlur,
                placeholder: finalPlaceholder,
                error: hasCurrentError,
              };

              // element가 forwardRef로 감싸져 있거나 ref를 받는 컴포넌트인 경우
              if (React.isValidElement(element)) {
                // Only pass ref if the element type supports it
                const props = { ...elementProps };
                props.ref = field.ref;
                return React.cloneElement(element, props);
              }

              // element가 유효한 ReactNode가 아니면, 빈 <span /> 반환 (항상 ReactElement 반환)
              return <span />;
            }

            return (
              <Input
                {...field}
                id={name}
                className={cn(styles.form_input, {
                  [styles.error]: hasCurrentError,
                })}
                placeholder={finalPlaceholder}
              />
            );
          }}
        />
      </div>

      <Controller
        name={name}
        control={control}
        render={({ fieldState }) => {
          const currentError = fieldState.error || activeErrors[name];
          const showError = !!currentError;

          if (showError) {
            return (
              <p className={cn(styles.guide_text, styles.error)}>
                {typeof currentError?.message === 'string'
                  ? currentError.message
                  : '잘못된 문자열 입력'}
              </p>
            );
          }

          if (guideText) {
            return <p className={styles.guide_text}>{guideText}</p>;
          }

          return <></>;
        }}
      />
      {!control && guideText && <p className={styles.guide_text}>{guideText}</p>}
    </div>
  );
};

export const BaseFormRow3 = memo(BaseFormRow3Component);
