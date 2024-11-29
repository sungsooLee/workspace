import { BaseFieldProps, FieldType } from '../type';

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  extra?: any;
}

export interface SelectFieldProps extends BaseFieldProps {
  type: FieldType.SELECT;
  options: SelectOption[];
  onChange?: (value: string) => void;
}

export interface MultiSelectFieldProps extends BaseFieldProps {
  type: FieldType.MULTI_SELECT;
  onChange?: (value: string[] | string) => void;
  options: SelectOption[];
  maxCount?: number;
  animation?: number;
  variant?: 'default' | 'secondary' | 'destructive' | 'inverted';
}
