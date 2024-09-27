import React from 'react';
import { useController } from 'react-hook-form';
import { Switch } from '../ui/switch';

interface SwitchInputProps {
  name: string;
  label?: string;
  description?: string;
  control: any;
  className?: string;
  disabled?: boolean;
}

export const SwitchInput: React.FC<SwitchInputProps> = ({
  name,
  label,
  description,
  control,
  className,
  disabled,
}) => {
  const { field } = useController({ name, control });

  return (
    <div
      className={`flex flex-row items-center justify-between rounded-lg border p-4 ${className}`}
    >
      <div className='space-y-0.5'>
        {label && <label className='flex text-base'>{label}</label>}
        {description && <p className='text-sm text-gray-500'>{description}</p>}
      </div>
      <Switch
        checked={field.value}
        onCheckedChange={field.onChange}
        disabled={disabled}
        aria-readonly={disabled}
      />
    </div>
  );
};
