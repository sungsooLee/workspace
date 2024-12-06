import { BaseFieldProps } from '../type';

export interface NumberFieldProps extends BaseFieldProps {
  prefix?: string;
  suffix?: string;
  locale?: string;
  decimalScale?: number;
  allowNegative?: boolean;
  thousandSeparator?: boolean;
  fixedDecimalScale?: boolean;
  min?: number;
  max?: number;
}
