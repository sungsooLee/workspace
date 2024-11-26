import { forwardRef } from 'react';
import { cn } from '@learnway/shared';
import { MultiSelectFieldConfig } from '../type';
import { MultiSelect } from '../select/multi-select';

const FormMultiSelect = forwardRef<HTMLButtonElement, MultiSelectFieldConfig>(
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

    const handleValueChange = (selectedValues: string[]) => {
      onChange?.(selectedValues);
    };

    return (
      <MultiSelect
        ref={ref}
        options={options}
        defaultValue={Array.isArray(value) ? value : value ? [value] : []}
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
