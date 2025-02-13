import { forwardRef, useEffect, useState } from 'react';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { NumericFormatProps } from 'react-number-format/types/types';
import { Button } from '../button/button';

import { cn } from '@learnway/shared';
import { IcoDelete03 } from '@learnway/icons';

import styles from './input.module.css';

export interface InputProps extends Omit<NumericFormatProps, 'type'> {
  type?: 'text' | 'number' | 'mask' | 'password' | 'tel' | 'file';
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
  borderNone?: boolean; // Input border 유무
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
      borderNone,
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
      <div className={cn(styles.start, 'nlp--input')}>
        {type === 'number' ? (
          <NumericFormat
            {...props}
            getInputRef={ref}
            className={cn(className)}
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
            className={cn(className)}
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
            className={cn(styles.input, className, borderNone ? styles.bd_none : '')}
            onKeyDown={onKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(event?.target?.value)
            }
          />
        )}

        {/* 삭제 버튼 | 단위 | 입력글자수/최대입력가능글자수 */}
        <div className={cn(styles.button_wrap)}>
          {/* 삭제 버튼 */}
          {isFocused && !!String(inputValue)?.length && (
            <Button type="button" onClick={handleClearClick} className={cn(styles.clear)} onlyIcon>
              <IcoDelete03 width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
            </Button>
          )}
          {/* 단위 */}
          {unitText && <div className={'text-gray-6'}>{unitText}</div>}
          {/* 입력글자수/최대입력가능글자수 */}
          {showCounter && type === 'text' && <div className={styles.count}>{'20/100'}</div>}
        </div>
      </div>
    );
  },
);

export const Input = InputComponent;
