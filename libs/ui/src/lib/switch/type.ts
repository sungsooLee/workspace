import { BaseFieldProps, FieldType } from '../type';

export interface SwitchFieldProps extends BaseFieldProps {
  type: FieldType.SWITCH;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  formLabel?: string;
}
