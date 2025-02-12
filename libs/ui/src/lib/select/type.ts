import { BaseFieldProps } from '../type';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  subLabel?: string;
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
