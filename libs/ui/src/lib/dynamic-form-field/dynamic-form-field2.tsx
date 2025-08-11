import { cloneElement, ComponentType, FC, isValidElement, useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { DynamicFormFieldProps } from './type';

/**
 * DynamicFormField 컴포넌트
 * - react-hook-form의 Controller를 사용하여 동적으로 폼 필드를 렌더링합니다.
 */
const DynamicFormFieldComponent2: FC<DynamicFormFieldProps> = ({
  control,
  name,
  component,
  children,
  clearFormError,
  isFieldRequired,
  trigger,
  formState,
  ...props
}) => {
  // enhancedOnChange 함수를 useCallback으로 메모이제이션
  const enhancedOnChange = useCallback(
    async (newValue: any, ...args: any[]) => {
      // 값이 변경되면 조건부로 해당 필드의 에러 클리어
      if (clearFormError && name && isFieldRequired && trigger && formState) {
        const required = isFieldRequired(name);

        if (!required) {
          // 필수 필드가 아니면 항상 에러 클리어
          clearFormError(name);
        } else {
          // 필수 필드인 경우: 현재 에러가 있을 때만 validation 실행
          const hasCurrentError = !!formState.errors[name];
          if (hasCurrentError) {
            // 에러가 있는 상태에서만 validation을 실행해서 유효할 때 에러 클리어
            try {
              const isValid = await trigger(name);
              if (isValid) {
                clearFormError(name);
              }
            } catch (error) {
              // validation 실행 중 에러가 발생해도 무시 (에러를 클리어하지 않음)
              console.warn('Validation trigger failed for field:', name, error);
            }
          }
        }
      }
    },
    [clearFormError, name, isFieldRequired, trigger, formState],
  );

  // render 함수를 useCallback으로 메모이제이션
  const renderField = useCallback(
    ({ field: { onChange, onBlur, value, ref } }: any) => {
      // onChange 핸들러에 에러 클리어 로직 추가
      const fieldOnChange = async (newValue: any, ...args: any[]) => {
        // 기본 onChange 호출
        onChange(newValue);
        // enhancedOnChange 호출하여 에러 클리어 로직 실행
        await enhancedOnChange(newValue, ...args);
      };

      const fieldOnBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
        onChange(event.target.value);
        // await enhancedOnChange(event.target.value);
      };

      if (isValidElement(component)) {
        return cloneElement(component, {
          ...props,
          ...(component.props || {}), // 컴포넌트 props
          ref,
          control,
          name,
          onChange: fieldOnChange,
          onBlur: fieldOnBlur,
          value,
        } as any);
      }
      const Component = component as ComponentType<any>;
      return (
        <Component
          {...props}
          ref={ref}
          control={control}
          name={name}
          onChange={fieldOnChange}
          onBlur={fieldOnBlur}
          value={value}
        />
      );
    },
    [component, props, enhancedOnChange],
  );

  if (!control || !name || !component) return;

  return <Controller control={control} name={name} render={renderField} />;
};
DynamicFormFieldComponent2.displayName = 'DynamicFormField2';
export const DynamicFormField2 = DynamicFormFieldComponent2;
