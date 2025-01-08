import { forwardRef, memo } from 'react';
import { cn } from '@learnway/shared';
import * as Primitive from './multi-select.shadcn';
import { MultiSelectFieldProps } from './type';

const MultiSelect = forwardRef<HTMLButtonElement, MultiSelectFieldProps>(
  (
    {
      value = [],
      onChange,
      options,
      maxCount = 3,
      animation = 0,
      placeholder,
      variant = 'default',
      disabled,
      className,
    },
    ref,
  ) => {
    const normalizedValue = Array.isArray(value) ? value.map(String) : value ? [String(value)] : [];
    const handleValueChange = (selectedValues: string[]) => {
      if (onChange) onChange?.(selectedValues);
    };

    return (
      <Primitive.MultiSelect
        ref={ref}
        options={options}
        value={normalizedValue}
        onValueChange={handleValueChange}
        maxCount={maxCount}
        animation={animation}
        placeholder={placeholder}
        variant={variant}
        disabled={disabled}
        className={cn(
          'group-[.has-error]:border-red-500 group-[.has-error]:focus:border-red-500',
          className,
        )}
      />
    );
  },
);

export default memo(MultiSelect);
