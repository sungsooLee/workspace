import { ActionMeta, MultiValue, SingleValue } from "react-select";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownComponentProps {
  options: DropdownOption[];
  value?: DropdownOption | readonly DropdownOption[] | null;
  onChange?: (
    newValue: SingleValue<DropdownOption> | MultiValue<DropdownOption>,
    actionMeta: ActionMeta<DropdownOption>
  ) => void;
  placeholder?: string;
  isDisabled?: boolean;
  isMulti?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  label?: string;
  hideLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'chip' | 'text';
  className?: string;
  name?: string;
  onBlur?: () => void;
}
