import { createContext, useContext } from 'react';
import { Control, UseFormReturn, FieldValues } from 'react-hook-form';

/**
 * 자동 폼 필드 수집을 위한 컨텍스트
 */

export interface FieldInfo {
  name: string;
  type?: string;
  defaultValue?: any;
  required?: boolean;
}

export interface AutoFormContextValue<T extends FieldValues = FieldValues> {
  // React Hook Form 관련
  control?: Control<T>;
  methods?: UseFormReturn<T>;
  formState?: {
    errors: any;
    isDirty: boolean;
    isValid: boolean;
    isSubmitting: boolean;
  };

  // 필드 자동 수집 관련
  fields: Map<string, FieldInfo>;
  registerField: (fieldInfo: FieldInfo) => void;
  unregisterField: (name: string) => void;
  isInitialized: boolean;
  setInitialized: (value: boolean) => void;
}

export const AutoFormContext = createContext<AutoFormContextValue<any> | null>(null);

export const useAutoFormContext = <
  T extends FieldValues = FieldValues,
>(): AutoFormContextValue<T> | null => {
  const context = useContext(AutoFormContext);
  return context as AutoFormContextValue<T> | null;
};
