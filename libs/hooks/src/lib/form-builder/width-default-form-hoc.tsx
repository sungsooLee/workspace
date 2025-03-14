// ✅ 기본값 설정 함수
import { BaseFormFieldProps } from './type';
import { UseFormReturn } from 'react-hook-form';
import { ComponentType, FC } from 'react';

export const getFormFieldBaseProps = <T = any,>(): Required<BaseFormFieldProps<T>> => ({
  control: {} as UseFormReturn['control'],
  value: '' as T,
  name: '',
  onChange: (value: T) => {
    // Default implementation for onChange
  },
  disabled: false,
  onChangeGuideText: (guidText: string) => {
    // Default implementation for onChange
  },
  onFormChange: (values?: Record<string, any>) => {
    // Default implementation for onChange
  },
});

export const withFormFieldProps = <P extends BaseFormFieldProps>(
  Component: FC<P>,
): FC<Omit<P, keyof BaseFormFieldProps> & Partial<BaseFormFieldProps>> => {
  const defaultProps = getFormFieldBaseProps();

  const WrappedComponent: FC<Omit<P, keyof BaseFormFieldProps> & Partial<BaseFormFieldProps>> = (
    props,
  ) => {
    return <Component {...(defaultProps as Required<BaseFormFieldProps>)} {...(props as P)} />;
  };

  WrappedComponent.displayName = `WithFormFieldProps(${Component.displayName || Component.name})`;

  return WrappedComponent;
};
