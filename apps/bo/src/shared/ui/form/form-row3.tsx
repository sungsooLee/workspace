import React from 'react';
import { BaseFormRow3 } from '@learnway/ui';
import { Control, FieldErrors } from 'react-hook-form';

interface FormRow3Props {
  name: string;
  label?: string;
  element?: React.ReactNode;
  control?: Control<any>;
  errors?: FieldErrors;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: (value: any, formValues?: any) => boolean | string;
  };
  placeholder?: string;
  guideText?: string;
  defaultValue?: any;
  className?: string;
  fieldType?: 'text' | 'number' | 'boolean' | 'select' | 'date' | 'email' | 'tel' | 'textarea'; // 자동 필드 타입 추론용
}

export const FormRow3: React.FC<FormRow3Props> = (props) => {
  return <BaseFormRow3 {...props} style="bo" />;
};
