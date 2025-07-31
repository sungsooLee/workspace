import { ElementRef, forwardRef, useEffect, useMemo } from 'react';
import { BaseFormFieldProps, useDynamicFormContext } from '@learnway/hooks';
import * as Primitive from '@radix-ui/react-switch';
import { useWatch } from 'react-hook-form';
import { Switch } from '@learnway/ui/switch';

const SwitchFormFieldComponent = forwardRef<
  ElementRef<typeof Primitive.Root>,
  BaseFormFieldProps<boolean> & { fieldLabel?: string }
>(
  (
    {
      value = false,
      control,
      fieldLabel: _fieldLabel = '',
      onChange,
      getValues,
      switchConfig,
      disabled,
      invert },
    ref,
  ) => {
    const { onChangeGuideText } = useDynamicFormContext();

    const watched = useWatch({
      control,
      name: switchConfig?.labelTarget || '' });

    const fieldLabel = useMemo<string>(() => {
      if (_fieldLabel) return _fieldLabel;
      if (!switchConfig?.label) return '';
      return switchConfig
        ? typeof switchConfig.label === 'string'
          ? switchConfig.label
          : switchConfig.label(value, getValues)
        : '';
    }, [_fieldLabel, value, watched]);

    useEffect(() => {
      if (switchConfig?.guideText) {
        onChangeGuideText(switchConfig.guideText(value));
      }
    }, [value]);

    return (
      <Switch
        ref={ref}
        checked={invert ? !value : value}
        onCheckedChange={(value) => onChange(invert ? !value : value)}
        label={fieldLabel}
        disabled={disabled}
      />
    );
  },
);

export const SwitchFormField = SwitchFormFieldComponent;
