import { forwardRef } from 'react';
import { cn } from '@learnway/shared';
import { MultiSelect } from '../shadcn/multi-select';
import { MultiSelectFieldProps } from './type';

const FormMultiSelect = forwardRef<HTMLButtonElement, MultiSelectFieldProps>(
  (
    {
      value = [],
      onChange,
      options,
      error,
      mode = 'edit',
      maxCount = 3,
      animation = 0,
      placeholder,
      variant = 'default',
      disabled,
      className,
    },
    ref,
  ) => {
    if (mode === 'read') {
      const selectedLabels = value
        .map((v: string | number) => options.find((opt) => opt.value === v)?.label)
        .filter(Boolean);

      return (
        <div className={cn('py-2 px-3 text-sm text-gray-900', className)}>
          {selectedLabels.length > 0 ? selectedLabels.join(', ') : '-'}
        </div>
      );
    }

    const normalizedValue = Array.isArray(value) ? value.map(String) : value ? [String(value)] : [];
    const handleValueChange = (selectedValues: string[]) => {
      if (onChange) onChange?.(selectedValues);
    };

    return (
      <MultiSelect
        ref={ref}
        options={options}
        value={normalizedValue}
        onValueChange={handleValueChange}
        maxCount={maxCount}
        animation={animation}
        placeholder={placeholder}
        variant={variant}
        disabled={disabled}
        className={cn(error && 'border-red-500', className)}
      />
    );
  },
);

export default FormMultiSelect;
