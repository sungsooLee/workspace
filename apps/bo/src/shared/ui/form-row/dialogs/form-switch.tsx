import { Switch } from '@learnway/ui';
import React, { forwardRef } from 'react';

const FormSwitchComponent = forwardRef<HTMLDivElement, any>(({ value, onChange }) => {
  return <Switch checked={value} onCheckedChange={onChange} />;
});

export const FormSwitch = FormSwitchComponent;
