import { Switch } from '@learnway/ui';
import { ElementRef, forwardRef } from 'react';
import * as Primitive from '@radix-ui/react-switch';

export interface SwitchFormFieldSimpleProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  label?: string;
  checked?: boolean;
}

const SwitchFormFieldSimpleComponent = forwardRef<
  ElementRef<typeof Primitive.Root>,
  SwitchFormFieldSimpleProps
>(({ value = false, onChange, disabled, label, checked, ...props }, ref) => {
  const isChecked = checked !== undefined ? checked : value;

  return (
    <Switch
      ref={ref}
      checked={isChecked}
      onCheckedChange={(newValue) => onChange?.(newValue)}
      label={label}
      disabled={disabled}
      {...props}
    />
  );
});

export const SwitchFormFieldSimple = SwitchFormFieldSimpleComponent;
