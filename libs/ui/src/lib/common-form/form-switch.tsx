import { forwardRef } from 'react';
import { SwitchFieldConfig } from './type';
import { cn } from '@/libs/shared/src';
import { Switch } from '../switch/switch';
import { Label } from '../label/label';

const FormSwitch = forwardRef<HTMLButtonElement, SwitchFieldConfig>(
  ({ checked, onCheckedChange, disabled, error, mode = 'edit', className, formLabel }, ref) => {
    if (mode === 'read') {
      return (
        <div className={cn('py-2 px-3 text-sm text-gray-900', className)}>
          {checked ? '예' : '아니오'}
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <Switch />
        {formLabel && <Label>{formLabel}</Label>}
      </div>
    );
  },
);

export default FormSwitch;
