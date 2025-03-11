import { FormEventHandler, MutableRefObject, ReactNode } from 'react';
import { Control, UseFormGetValues, FormState } from 'react-hook-form';
import { Builder } from '../dynamic-form-field';

/**
 * 폼 필드 생성을 위한 프로바이더 객체 인터페이스.
 */
export interface FormRowProvider {
  control: Control & {
    isFieldRequired: (name: string) => boolean;
  };
  builders: Builder[];
  fieldRefs: MutableRefObject<Record<string, HTMLElement | null>>;
  watch: (name?: string | string[]) => any;
  onFormChange: (value?: any) => void;
  getValues: UseFormGetValues<any>;
  onFocus: (fieldName: string) => void;
  formState: FormState<any>;
  originalValues: { [key: string]: any };
}

/**
 * FormRow 컴포넌트의 props 타입.
 */
export interface FormRowProps {
  provider: FormRowProvider;
  name?: string;
  type?: string;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  [key: string]: any;
}

/*======================================
=         useDynamicForm 반환 타입         =
======================================*/

/**
 * useDynamicForm 훅의 반환 타입.
 */
export interface DynamicFormReturn {
  provider: FormRowProvider;

  control: Control;
  getValues: UseFormGetValues<any>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  reset: (values?: any) => void;
}

export interface FormDisplayProps {
  provider: FormRowProvider;
  dependencies?: { name: string; value: any }[];
  onDisplay?: (values: { [key: string]: any }) => boolean;
  children: ReactNode;
}
