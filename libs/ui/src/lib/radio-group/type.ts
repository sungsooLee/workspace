import { SelectOption } from '../type';
import { BaseFieldProps, FieldType } from '../type';

export interface RadioGroupOption extends SelectOption {
  description?: string;
}

export interface RadioFieldProps extends BaseFieldProps {
  type: FieldType.RADIO;
  options: RadioGroupOption[];
  orientation?: 'vertical' | 'horizontal';
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}
