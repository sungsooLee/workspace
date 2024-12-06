import { BaseFieldProps } from '../type';

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  extra?: any;
}

export interface SelectFieldProps extends BaseFieldProps {
  options: SelectOption[];
}

export interface MultiSelectFieldProps extends BaseFieldProps {
  options: SelectOption[];
  maxCount?: number;
  animation?: number;
  variant?: 'default' | 'secondary' | 'destructive' | 'inverted';
}
