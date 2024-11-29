import { SelectOption } from '../select/type';
import { BaseFieldProps, FieldType } from '../type';

export interface RadioOption extends SelectOption {
  description?: string;
}

export interface RadioFieldProps extends BaseFieldProps {
  type: FieldType.RADIO;
  options: RadioOption[];
  orientation?: 'vertical' | 'horizontal';
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}
