import { forwardRef } from 'react';

import { cn } from '@learnway/shared';

import { Switch } from '../shadcn/switch';
import { Label } from '../shadcn/label';
import { SwitchFieldProps } from './type';

const FormSwitch = forwardRef<HTMLButtonElement, SwitchFieldProps>(
  ({ value, onChange, disabled, formLabel, className }, ref) => {
    return (
      <div className={cn('flex items-center space-x-2', className)}>
        <Switch
          checked={value}
          onCheckedChange={(checked) => onChange && onChange(checked)}
          disabled={disabled}
        />
        {formLabel && <Label>{formLabel}</Label>}
      </div>
    );
  },
);

export default FormSwitch;
