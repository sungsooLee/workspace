import { Switch } from '@learnway/ui';
import React, { ElementRef, forwardRef, useMemo } from 'react';
import { BaseFormFieldProps } from '@learnway/hooks';
import * as Primitive from '@radix-ui/react-switch';

const SwitchFormFieldComponent = forwardRef<
  ElementRef<typeof Primitive.Root>,
  BaseFormFieldProps<boolean>
>(({ value, onChange, getValues, switchConfig }, ref) => {
  const fieldLabel = useMemo<string>(
    () =>
      switchConfig
        ? typeof switchConfig.label === 'string'
          ? switchConfig.label
          : switchConfig.label(value, getValues)
        : '',
    [value],
  );

  return <Switch ref={ref} checked={value} onCheckedChange={onChange} label={fieldLabel} />;
});

export const SwitchFormField = SwitchFormFieldComponent;
