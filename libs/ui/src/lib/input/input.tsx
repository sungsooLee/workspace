import { forwardRef, useEffect, useState } from 'react';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { NumericFormatProps } from 'react-number-format/types/types';

import { cn } from '@learnway/shared';
import { IcoDelete03 } from '@learnway/icons';

import styles from './input.module.css';

export interface InputProps extends Omit<NumericFormatProps, 'type'> {
  type?: 'text' | 'number' | 'mask' | 'password' | 'tel';
  placeHolder?: string;
  unitText?: string;
  // onChange?: (value: any) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // for text type
  showCounter?: boolean; // 입력글자수/최대입력가능글자수 표시 여부
  // for mask type
  mask?: string | string[]; // mask 설정 문자열
  format?: string; // format 설정 문자열
  allowEmptyFormatting?: boolean;
}

const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      thousandSeparator = true,
      disabled,
      className,
      value = '',
      onBlur,
      placeHolder = '값을 입력하세요.',
      unitText,
      onChange,
      showCounter,
      mask,
      format = '',
      allowEmptyFormatting = true,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    useEffect(() => {
      if (value !== inputValue) {
        const event = {
          target: {
            value: inputValue,
          },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange?.(event);
      }
    }, [inputValue]);

    const handleInputChange = (value: any) => {
      setInputValue(value);
    };

    const handleInputFocus = () => {
      setIsFocused(true);
    };

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    };

    const handleClearClick = () => {
      setInputValue('');
    };

    return (
      <div className={cn(styles.start, 'nlp--input', 'flex flex-row border p-1')}>
        {type === 'number' ? (
          <NumericFormat
            {...props}
            getInputRef={ref}
            className={cn(className, 'placeholder:text-gray-500 focus:outline-none')}
            value={inputValue}
            thousandSeparator={thousandSeparator}
            placeholder={placeHolder}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onValueChange={(values) => {
              handleInputChange(values.value);
            }}
          />
        ) : type === 'mask' ? (
          <PatternFormat
            {...props}
            getInputRef={ref}
            className={cn(className, 'placeholder:text-gray-500 focus:outline-none')}
            value={inputValue}
            format={format}
            mask={mask}
            placeholder={placeHolder}
            allowEmptyFormatting={allowEmptyFormatting}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onValueChange={(values) => {
              handleInputChange(values.value);
            }}
          />
        ) : (
          <input
            ref={ref}
            value={inputValue || ''}
            disabled={disabled}
            type={type}
            placeholder={placeHolder}
            onKeyDown={onKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(event?.target?.value)
            }
          />
        )}

        {/* 삭제 버튼 | 단위 | 입력글자수/최대입력가능글자수 */}
        <div className={cn(styles.button, 'flex flex-row gap-2')}>
          {/* 삭제 버튼 */}
          {isFocused && !!String(inputValue)?.length && (
            <button
              type="button"
              onClick={handleClearClick}
              className={cn(styles.clear, 'focus:outline-none')}>
              <IcoDelete03 width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
            </button>
          )}
          {/* 단위 */}
          {unitText && <div className={'text-gray-6'}>{unitText}</div>}
          {/* 입력글자수/최대입력가능글자수 */}
          {showCounter && type === 'text' && <div className={'text-gray-6'}>{'20/100'}</div>}
        </div>
      </div>
    );
  },
);

export const Input = InputComponent;
