import { FC } from 'react';
import { Controller } from 'react-hook-form';

/**
 * DynamicFormField 컴포넌트
 * - react-hook-form의 Controller를 사용하여 동적으로 폼 필드를 렌더링합니다.
 */
const DynamicFormFieldComponent: FC<any> = ({ control, name, component: Component, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Component {...props} onChange={onChange} onBlur={onBlur} value={value} ref={ref} />
      )}
    />
  );
};
DynamicFormFieldComponent.displayName = 'DynamicFormField';
export const DynamicFormField = DynamicFormFieldComponent;
