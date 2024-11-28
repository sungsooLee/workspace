import { forwardRef } from 'react';
import { cn } from '@/libs/shared/src';
import { Switch } from '../shadcn/switch';
import { Label } from '../shadcn/label';
import { SwitchFieldProps } from './type';

const FormSwitch = forwardRef<HTMLButtonElement, SwitchFieldProps>(
  ({ value, onChange, disabled, error, mode = 'edit', className, formLabel, ...props }, ref) => {
    if (mode === 'read') {
      return (
        <div className={cn('py-2 px-3 text-sm text-gray-900', className)}>
          {value ? '예' : '아니오'}
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <Switch checked={value} onCheckedChange={(checked) => onChange && onChange(checked)} />
        {formLabel && <Label>{formLabel}</Label>}
      </div>
    );
  },
);

export default FormSwitch;
