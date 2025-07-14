export interface FormFieldDefinition {
  name: string;
  type: 'text' | 'number' | 'boolean' | 'select' | 'date' | 'email' | 'tel' | 'textarea';
  defaultValue?: any;
  required?: boolean;
}

export interface FormSchema {
  fields: FormFieldDefinition[];
}

/**
 * 필드 타입에 따른 기본값 생성
 */
const getDefaultValueByType = (type: FormFieldDefinition['type']): any => {
  switch (type) {
    case 'text':
    case 'email':
    case 'tel':
    case 'textarea':
      return '';
    case 'number':
      return 0;
    case 'boolean':
      return false;
    case 'select':
      return '';
    case 'date':
      return '';
    default:
      return '';
  }
};

/**
 * FormSchema로부터 기본값 객체 자동 생성
 */
export const generateDefaultValues = <T extends Record<string, any>>(schema: FormSchema): T => {
  const defaultValues = {} as T;

  schema.fields.forEach((field) => {
    const key = field.name as keyof T;
    defaultValues[key] =
      field.defaultValue !== undefined ? field.defaultValue : getDefaultValueByType(field.type);
  });

  return defaultValues;
};
