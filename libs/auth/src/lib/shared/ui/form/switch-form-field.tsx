import { Switch } from '@learnway/ui';
import React, { forwardRef, useEffect } from 'react';

const SwitchFormFieldComponent = forwardRef<any, any>(({ value, onChange }, ref) => {
  useEffect(() => {
    console.log('switch value changed => ', value);
  }, [value]);
  return <Switch ref={ref} checked={value} onCheckedChange={onChange} />;
});

export const SwitchFormField = SwitchFormFieldComponent;
