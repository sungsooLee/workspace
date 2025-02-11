import { forwardRef, useState } from 'react';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { NumericFormatProps } from 'react-number-format/types/types';

import { cn } from '@learnway/shared';

import styles from './number-input.module.css';
import { IcoDelete03 } from '@learnway/icons';

export interface NumberInputProps extends NumericFormatProps {
  min?: number;
  max?: number;
  error?: boolean;
  placeHolder?: string;
  rightText?: string;
  onChange?: (value: any) => void;
  numeric?: boolean; // 숫자 입력 모드
  mask?: string | string[]; // 마스크 입력 모드
  format?: string; // 마스크 사용시 format 설정
}

const NumberInputComponent = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      thousandSeparator = true,
      disabled,
      error,
      className,
      onChange,
      value,
      onBlur,
      placeHolder = '값을 입력하세요.',
      rightText,
      numeric,
      mask,
      format = '',
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (value: any) => {
      setInputValue(value);
    };

    const handleInputFocus = () => {
      setIsFocused(true);
    };

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onBlur?.(event);
    };

    const handleClearClick = () => {
      setInputValue('');
    };

    console.log(inputValue);

    return (
      <div className={cn(styles.start, 'nlp--input', 'flex flex-row border p-1')}>
        {numeric ? (
          <NumericFormat
            {...props}
            getInputRef={ref}
            className={cn(
              className,
              'placeholder:text-gray-500',
              'focus:outline-none',
              disabled && 'cursor-not-allowed bg-gray-100 text-gray-400',
            )}
            // customInput={() => <input onFocus={handleInputFocus} onBlur={handleInputBlur} />}
            value={inputValue}
            thousandSeparator={thousandSeparator}
            placeholder={placeHolder}
            onValueChange={(values) => {
              handleInputChange(values.value);
            }}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        ) : mask ? (
          <PatternFormat
            {...props}
            getInputRef={ref}
            className={cn(
              className,
              'placeholder:text-gray-500',
              'focus:outline-none',
              disabled && 'cursor-not-allowed bg-gray-100 text-gray-400',
            )}
            value={inputValue}
            format={format}
            mask={mask}
            placeholder={placeHolder}
            onValueChange={(values) => {
              handleInputChange(values.value);
            }}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        ) : (
          <input
            ref={ref}
            value={inputValue}
            disabled={disabled}
            placeholder={placeHolder}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(event?.target?.value)
            }
          />
        )}

        {/* clear button & right text */}
        <div className={cn(styles.button, '')}>
          {/* clear button */}
          {isFocused && !!String(inputValue)?.length && (
            <button
              type="button"
              onClick={handleClearClick}
              className={cn(styles.clear, 'focus:outline-none')}>
              <IcoDelete03 width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
            </button>
          )}
          {/* right text */}
          {rightText && <span>{rightText}</span>}
        </div>
      </div>
    );
  },
);

export const NumberInput = NumberInputComponent;
