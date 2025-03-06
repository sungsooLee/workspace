import { forwardRef, useEffect, useState } from 'react';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { NumericFormatProps } from 'react-number-format/types/types';
import { Button } from '../button/button';

import { cn } from '@learnway/shared';
import { IcoDelete03, IcoSearch } from '@learnway/icons';

import styles from './input.module.css';

export interface InputProps extends Omit<NumericFormatProps, 'type'> {
  type?: 'text' | 'number' | 'mask' | 'password' | 'tel' | 'file';
  placeholder?: string;
  unitText?: string;
  timerText?: string; // timer input 에서만 사용
  // onChange?: (value: any) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // for text type
  showCounter?: boolean; // 입력글자수/최대입력가능글자수 표시 여부
  // for mask type
  mask?: string | string[]; // mask 설정 문자열
  format?: string; // format 설정 문자열
  allowEmptyFormatting?: boolean;
  borderNone?: boolean; // Input border 유무
  error?: boolean; // Input border 유무
  //
  showSearchIcon?: boolean; // 검색 아이콘 표시 유무
  onEnterKeyDown?: () => void; // 엔터 키 입력 callback, 검색 아이콘 클릭 했을때 해당 callback 호출
}

const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      thousandSeparator = true,
      readOnly,
      disabled,
      error, // error 케이스 추가
      className,
      value = '',
      onBlur,
      placeholder = '값을 입력하세요.',
      unitText,
      timerText,
      onChange,
      showCounter,
      borderNone,
      mask,
      format = '',
      allowEmptyFormatting = true,
      onKeyDown,
      showSearchIcon,
      onEnterKeyDown,
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
            placeholder={placeholder}
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
            placeholder={placeholder}
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
            readOnly={readOnly}
            disabled={disabled}
            type={type}
            placeholder={placeholder}
            className={cn(
              styles.input,
              className,
              borderNone ? styles.bd_none : '',
              error ? styles.error : '',
            )}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'Enter') {
                event.preventDefault(); // Enter 키 기본 동작 방지
                onEnterKeyDown?.(); // onEnterKeyDown callback
              }
              onKeyDown && onKeyDown(event);
            }}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              event.preventDefault();
              event.stopPropagation();
              handleInputChange(event?.target?.value);
            }}
          />
        )}

        {/* 삭제 버튼 | 단위 | 입력글자수/최대입력가능글자수 */}
        <div className={cn(styles.button_wrap)}>
          {/* 삭제 버튼 */}
          {!readOnly && isFocused && !!String(inputValue)?.length && (
            <Button type="button" onClick={handleClearClick} className={cn(styles.clear)} onlyIcon>
              <IcoDelete03 width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
            </Button>
          )}
          {/* 타이머 */}
          {timerText && <div className={styles.time}>{timerText}</div>}
          {/* 단위 */}
          {unitText && <div className={styles.unit}>{unitText}</div>}
          {/* 입력글자수/최대입력가능글자수 */}
          {showCounter && type === 'text' && <div className={styles.count}>{'20/100'}</div>}
          {/* 돋보기 */}
          {showSearchIcon && (
            <Button
              type="button"
              onClick={() => onEnterKeyDown?.()}
              className={cn(styles.clear)}
              onlyIcon>
              <IcoSearch width={20} height={20} stroke={'#131C30'} />
            </Button>
          )}
        </div>
      </div>
    );
  },
);

export const Input = InputComponent;
