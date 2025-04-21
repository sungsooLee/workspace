import { forwardRef, useEffect, useState } from 'react';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { NumericFormatProps } from 'react-number-format/types/types';
import { Button } from '../button/button';

import { cn } from '@learnway/shared';
import { IcoDelete03, IcoSearch } from '@learnway/icons';

import styles from './input.module.css';

export interface InputProps extends Omit<NumericFormatProps, 'type'> {
  type?: 'text' | 'number' | 'mask' | 'password' | 'tel' | 'file';
  id?: string;
  placeholder?: string;
  unitText?: string;
  timerText?: string; // timer input 에서만 사용
  // onChange?: (value: any) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // for text type
  hideInputLength?: boolean; // 입력글자수/최대입력가능글자수 표시 여부, maxLength 설정은 했지만 글자수 표시 안보이게 할 경우 사용
  // for mask type
  mask?: string | string[]; // mask 설정 문자열
  format?: string; // format 설정 문자열
  allowEmptyFormatting?: boolean;
  borderNone?: boolean; // Input border 유무
  error?: boolean; // Input border 유무
  //
  showSearchIcon?: boolean; // 검색 아이콘 표시 유무
  onEnterKeyDown?: () => void; // 엔터 키 입력 callback, 검색 아이콘 클릭 했을때 해당 callback 호출
  //
}

const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      id,
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
      hideInputLength,
      borderNone,
      mask,
      format = '',
      allowEmptyFormatting = true,
      onKeyDown,
      showSearchIcon,
      onEnterKeyDown,
      maxLength = 0,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleInputChange = (value: any) => {
      const changeEvent = {
        target: {
          value: value,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(changeEvent);
    };

    const handleInputFocus = () => {
      setIsFocused(true);
    };

    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    };

    const handleClearClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      console.log(event);
      // 내부 상태 변경 대신 onChange 이벤트를 통해 상위 컴포넌트에 알림
      const clearEvent = {
        target: {
          value: '',
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(clearEvent);
    };
    return (
      <div className={cn(styles.start, 'nlp--input')}>
        {type === 'number' ? (
          <NumericFormat
            {...props}
            getInputRef={ref}
            id={id}
            className={cn(
              styles.input,
              className,
              borderNone ? styles.bd_none : '',
              error ? styles.error : '',
            )}
            value={value}
            thousandSeparator={thousandSeparator}
            placeholder={placeholder}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onValueChange={(values) => {
              handleInputChange(values.value);
            }}
            disabled={disabled}
            maxLength={maxLength > 0 ? maxLength : undefined}
          />
        ) : type === 'mask' ? (
          <PatternFormat
            {...props}
            getInputRef={ref}
            id={id}
            className={cn(className)}
            value={value}
            format={format}
            mask={mask}
            placeholder={placeholder}
            allowEmptyFormatting={allowEmptyFormatting}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onValueChange={(values) => {
              handleInputChange(values.value);
            }}
            maxLength={maxLength > 0 ? maxLength : undefined}
          />
        ) : (
          <input
            ref={ref}
            id={id}
            value={value || ''}
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
            maxLength={maxLength > 0 ? maxLength : undefined}
          />
        )}

        {/* 삭제 버튼 | 단위 | 입력글자수/최대입력가능글자수 */}
        <div className={cn(styles.button_wrap)}>
          {/* 삭제 버튼 */}
          {!readOnly && isFocused && !!String(value)?.length && (
            <Button
              type="button"
              className={cn(styles.clear)}
              onlyIcon
              onMouseDown={handleClearClick}
            >
              <IcoDelete03 width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
            </Button>
          )}
          {/* 타이머 */}
          {timerText && <div className={styles.time}>{timerText}</div>}
          {/* 단위 */}
          {unitText && <div className={styles.unit}>{unitText}</div>}
          {/* 입력글자수/최대입력가능글자수 */}
          {!hideInputLength && maxLength > 0 && type === 'text' && (
            <div
              className={styles.count}
            >{`${(value?.toString() || '').length} / ${maxLength}`}</div>
          )}
          {/* 돋보기 */}
          {showSearchIcon && (
            <Button
              type="button"
              onClick={() => onEnterKeyDown?.()}
              className={cn(styles.clear)}
              onlyIcon
            >
              <IcoSearch width={20} height={20} stroke={'#131C30'} />
            </Button>
          )}
        </div>
      </div>
    );
  },
);

export const Input = InputComponent;
