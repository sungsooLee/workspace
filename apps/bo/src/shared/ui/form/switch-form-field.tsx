import { Switch } from '@learnway/ui';
import React, { ElementRef, forwardRef, useEffect, useMemo } from 'react';
import { BaseFormFieldProps } from '@learnway/hooks';
import * as Primitive from '@radix-ui/react-switch';
import { useWatch } from 'react-hook-form';

const SwitchFormFieldComponent = forwardRef<
  ElementRef<typeof Primitive.Root>,
  BaseFormFieldProps<boolean>
>(({ value, control, onChange, getValues, switchConfig, disabled }, ref) => {
  const watched = useWatch({
    control,
    name: switchConfig?.labelTarget || '',
  });
  const fieldLabel = useMemo<string>(
    () =>
      switchConfig
        ? typeof switchConfig.label === 'string'
          ? switchConfig.label
          : switchConfig.label(value, getValues)
        : '',
    [value, watched],
  );
  return (
    <Switch
      ref={ref}
      checked={value}
      onCheckedChange={onChange}
      label={fieldLabel}
      disabled={disabled}
    />
  );
});

export const SwitchFormField = SwitchFormFieldComponent;
