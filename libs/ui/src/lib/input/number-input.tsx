import { forwardRef } from 'react';
import { NumericFormat } from 'react-number-format';

import { cn } from '@learnway/shared';

import { BaseFieldProps } from '../type';

import styles from './number-input.module.scss';

export interface NumberFieldProps extends BaseFieldProps {
  prefix?: string;
  suffix?: string;
  locale?: string;
  decimalScale?: number;
  allowNegative?: boolean;
  thousandSeparator?: boolean;
  fixedDecimalScale?: boolean;
  min?: number;
  max?: number;
}

const NumberInputComponent = forwardRef<HTMLInputElement, NumberFieldProps>(
  (
    {
      prefix,
      suffix,
      decimalScale = 0,
      allowNegative = false,
      thousandSeparator = true,
      placeholder,
      disabled,
      error,
      className,
      onChange,
      onBlur,
      value,
      type,
      fixedDecimalScale,
      ...props
    },
    ref,
  ) => {
    return (
      <NumericFormat
        getInputRef={ref}
        className={cn(
          styles.start,
          'w-full rounded-md border px-3 py-2 text-sm',
          'border-gray-300 bg-white text-gray-900',
          'placeholder:text-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-blue-500',
          'group-[.has-error]:border-red-500 group-[.has-error]:focus:border-red-500',
          disabled && 'bg-gray-100 text-gray-400 cursor-not-allowed',
          className,
        )}
        decimalScale={decimalScale}
        fixedDecimalScale={fixedDecimalScale}
        allowNegative={allowNegative}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onValueChange={(values) => {
          onChange?.(values.value);
        }}
        onBlur={onBlur}
        prefix={prefix}
        suffix={suffix}
        thousandSeparator={thousandSeparator}
        {...props}
      />
    );
  },
);

export const NumberInput = NumberInputComponent;
