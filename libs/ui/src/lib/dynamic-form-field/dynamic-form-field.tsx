import { cloneElement, ComponentType, FC, isValidElement } from 'react';
import { Controller } from 'react-hook-form';
import { DynamicFormFieldProps } from './type';
/**
 * DynamicFormField 컴포넌트
 * - react-hook-form의 Controller를 사용하여 동적으로 폼 필드를 렌더링합니다.
 */
const DynamicFormFieldComponent: FC<DynamicFormFieldProps> = ({
  control,
  name,
  component,
  children,
  ...props
}) => {
  if (!control || !name || !component) return;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => {
        if (isValidElement(component)) {
          return cloneElement(component, {
            ...props,
            ref,
            control,
            name,
            onChange,
            onBlur,
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
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        );
      }}
    />
  );
};
DynamicFormFieldComponent.displayName = 'DynamicFormField';
export const DynamicFormField = DynamicFormFieldComponent;
