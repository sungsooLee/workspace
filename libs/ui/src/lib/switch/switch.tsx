import { forwardRef } from 'react';

import { cn } from '@learnway/shared';
import { SwitchFieldProps } from './type';

import * as Primitive from '../shadcn/switch';
import { Label } from '../shadcn/label';

const SwitchComponent = forwardRef<HTMLButtonElement, SwitchFieldProps>(
  ({ value, onChange, disabled, formLabel, className }, ref) => {
    return (
      <div className={cn('flex items-center space-x-2', className)}>
        <Primitive.Switch
          checked={value}
          onCheckedChange={(checked) => onChange && onChange(checked)}
          disabled={disabled}
        />
        {formLabel && <Label>{formLabel}</Label>}
      </div>
    );
  },
);

export const Switch = SwitchComponent;
