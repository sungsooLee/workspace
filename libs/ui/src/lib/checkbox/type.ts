import { BaseFieldProps, FieldType } from '../type';

export interface CheckFieldProps extends BaseFieldProps {
  type: FieldType.CHECKBOX;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  checkboxLabel?: string;
}
