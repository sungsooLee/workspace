import { forwardRef, useState } from 'react';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { NumericFormatProps } from 'react-number-format/types/types';
import { Button } from '../button/button';

import { cn } from '@learnway/shared';
import { IcoDelete03, IcoSearch, IcoSearchWrite } from '@learnway/icons';

import styles from './input.module.css';

export interface InputProps extends Omit<NumericFormatProps, 'type'> {
  type?: 'text' | 'number' | 'mask' | 'password' | 'tel' | 'file' | 'alphanumeric';
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
  searchIconType?: 'modal' | 'search'; // 아이콘 타입 선택
  onEnterKeyDown?: () => void; // 엔터 키 입력 callback, 검색 아이콘 클릭 했을때 해당 callback 호출
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
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
      searchIconType = 'modal',
      onEnterKeyDown,
      maxLength,
      onFocus,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    // 영문/숫자만 허용하는 정규식
    const alphanumericRegex = /^[a-zA-Z0-9]*$/;
    ///
    const handleAlphanumericChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event);
      const inputValue = event.target.value;

      if (alphanumericRegex.test(inputValue)) {
        handleInputChange(inputValue);
      }
    };

    const handleAlphanumericKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const allowedKeys = [
        'Backspace',
        'Delete',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Home',
        'End',
        'Tab',
        'Enter',
        'Escape',
      ];

      if (event.ctrlKey || event.metaKey) {
        return;
      }

      if (!allowedKeys.includes(event.key) && !alphanumericRegex.test(event.key)) {
        event.preventDefault();
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        onEnterKeyDown?.();
      }

      onKeyDown?.(event);
    };

    const handleAlphanumericPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
      const pastedText = event.clipboardData.getData('text');

      if (!alphanumericRegex.test(pastedText)) {
        event.preventDefault();
      }
    };
    ///
    const handleInputChange = (value: any) => {
      const changeEvent = {
        target: {
          value: value,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(changeEvent);
    };

    const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(event);
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
            maxLength={maxLength}
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
            maxLength={maxLength}
          />
        ) : type === 'alphanumeric' ? (
          <input
            ref={ref}
            id={id}
            value={value || ''}
            readOnly={readOnly}
            disabled={disabled}
            type="text"
            placeholder={placeholder}
            className={cn(
              styles.input,
              className,
              borderNone ? styles.bd_none : '',
              error ? styles.error : '',
            )}
            onKeyDown={handleAlphanumericKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={handleAlphanumericChange}
            onPaste={handleAlphanumericPaste}
            maxLength={maxLength}
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
            maxLength={maxLength}
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
          {!hideInputLength && maxLength && (type === 'text' || type === 'alphanumeric') && (
            <div
              className={styles.count}
            >{`${(value?.toString() || '').length} / ${maxLength}`}</div>
          )}
          {/* 아이콘 (돋보기, 검색) */}
          {showSearchIcon && (
            <Button
              type="button"
              onClick={() => onEnterKeyDown?.()}
              className={cn(styles.clear)}
              onlyIcon
            >
              {searchIconType === 'search' ? (
                <IcoSearchWrite width={20} height={20} stroke={'#4C515E'} />
              ) : (
                <IcoSearch width={20} height={20} stroke={'#131C30'} />
              )}
            </Button>
          )}
        </div>
      </div>
    );
  },
);

export const Input = InputComponent;
