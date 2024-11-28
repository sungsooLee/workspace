import { BaseFieldProps, FieldType } from '../type';

export interface TextFieldProps extends BaseFieldProps {
  type: FieldType.TEXT;
  inputType?: string;
}

export interface NumberFieldProps extends Omit<BaseFieldProps, 'type' | 'value'> {
  type: FieldType.NUMBER;
  prefix?: string;
  suffix?: string;
  currency?: string;
  locale?: string;
  decimalScale?: number;
  allowNegative?: boolean;
  thousandSeparator?: boolean;
  min?: number;
  max?: number;
}
