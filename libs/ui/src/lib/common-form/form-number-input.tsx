import { forwardRef } from 'react';
import { cn } from '@learnway/shared';
import { NumericFormat } from 'react-number-format';
import { CustomNumberInputProps } from './type';
// import { CustomNumberInputProps, NumberFieldConfig } from "../form/common/type";

const FormNumberInput = forwardRef<HTMLInputElement, CustomNumberInputProps>(
  (
    {
      prefix,
      suffix,
      currency,
      locale = 'ko-KR',
      decimalScale = 0,
      allowNegative = false,
      thousandSeparator = true,
      placeholder,
      disabled,
      error,
      mode = 'edit',
      className,
      onChange,
      onBlur,
      value,
      ...props
    },
    ref,
  ) => {
    // 읽기 모드 처리
    if (mode === 'read') {
      let displayValue = value;

      if (value != null && value !== '') {
        const numberValue = Number(value);
        if (!isNaN(numberValue)) {
          displayValue = new Intl.NumberFormat(locale, {
            style: currency ? 'currency' : 'decimal',
            currency,
            minimumFractionDigits: decimalScale,
            maximumFractionDigits: decimalScale,
          }).format(numberValue);
        }
      }

      return (
        <div className={cn('py-2 px-3 text-sm text-gray-900', className)}>
          {prefix && <span className="mr-1">{prefix}</span>}
          {displayValue ?? '-'}
          {suffix && <span className="ml-1">{suffix}</span>}
        </div>
      );
    }

    const getCurrencyDecimalScale = (currency?: string) => {
      switch (currency) {
        case 'KRW':
          return 0;
        case 'USD':
        case 'EUR':
          return 2;
        default:
          return 0;
      }
    };

    const formatProps = currency
      ? {
          thousandSeparator: true,
          prefix: `${currency} `,
          suffix,
          decimalScale: decimalScale ?? getCurrencyDecimalScale(currency),
          fixedDecimalScale: (decimalScale ?? getCurrencyDecimalScale(currency)) > 0,
        }
      : {
          thousandSeparator,
          decimalScale,
          prefix,
          suffix,
        };

    return (
      <NumericFormat
        getInputRef={ref}
        className={cn(
          'w-full rounded-md border px-3 py-2 text-sm',
          'border-gray-300 bg-white text-gray-900',
          'placeholder:text-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-blue-500',
          error && 'border-red-500 focus:ring-red-500',
          disabled && 'bg-gray-100 text-gray-400 cursor-not-allowed',
          className,
        )}
        // decimalScale={decimalScale}
        allowNegative={allowNegative}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onValueChange={(values) => {
          onChange?.(values.value);
        }}
        onBlur={onBlur}
        {...formatProps}
        {...props}
      />
    );
  },
);

export default FormNumberInput;
