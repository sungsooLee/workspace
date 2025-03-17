import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { DynamicFormFieldProps } from './type';
/**
 * DynamicFormField 컴포넌트
 * - react-hook-form의 Controller를 사용하여 동적으로 폼 필드를 렌더링합니다.
 */
const DynamicFormFieldComponent: FC<DynamicFormFieldProps> = ({
  control,
  name,
  component: Component,
  children,
  ...props
}) => {
  if (!control || !name || !Component) return;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Component
          {...props}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          ref={ref}
          control={control}
        />
      )}
    />
  );
};
DynamicFormFieldComponent.displayName = 'DynamicFormField';
export const DynamicFormField = DynamicFormFieldComponent;
