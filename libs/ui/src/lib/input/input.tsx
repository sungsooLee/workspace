import { forwardRef, useMemo, useState, useRef } from 'react';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { NumericFormatProps } from 'react-number-format/types/types';
import { Button } from '../button/button';

import { cn } from '@learnway/shared';
import { IcoDelete03, IcoSearch, IcoSearchWrite } from '@learnway/icons';

import styles from './input.module.css';
import { useTranslation } from 'react-i18next';

export interface InputProps extends Omit<NumericFormatProps, 'type'> {
  type?: 'text' | 'number' | 'mask' | 'password' | 'tel' | 'file' | 'alphanumeric' | 'url';
  id?: string;
  placeholder?: string;
  prefixText?: string;
  suffixText?: string;
  timerText?: string; // timer input 에서만 사용
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
  label?: string;
  hiddenPlaceholder?: boolean;
  inputType?: string;
  showAlphanumericToast?: boolean; // alphanumeric 타입에서 잘못된 문자 입력 시 토스트 메시지 표시 여부
  showUrlToast?: boolean; // url 타입에서 잘못된 문자 입력 시 토스트 메시지 표시 여부
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
      placeholder,
      prefixText,
      suffixText,
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
      hiddenPlaceholder,
      inputType,
      showAlphanumericToast = true,
      showUrlToast = true,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation();

    const placeholderText = useMemo(() => {
      if (hiddenPlaceholder) return '';
      if (placeholder) return t(placeholder);
      if (props && props.label)
        return `${t(props.label as any)} ${t('LABEL.form.input.placeholder')}`;
      return t('LABEL.form.input.placeholder');
    }, [placeholder, props?.label, hiddenPlaceholder]);

    const [isFocused, setIsFocused] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 영문/숫자만 허용하는 정규식
    const alphanumericRegex = /^[a-zA-Z0-9.]*$/;
    // URL에 허용되는 문자 정규식 (영문, 숫자, URL 특수문자)
    const urlRegex = /^[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]*$/;
    ///
    const handleAlphanumericChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

        // 토스트 메시지 표시
        if (showAlphanumericToast) {
          if (toastTimeoutRef.current) {
            clearTimeout(toastTimeoutRef.current);
          }
          setShowToast(true);
          toastTimeoutRef.current = setTimeout(() => setShowToast(false), 3000);
        }
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

        // 토스트 메시지 표시
        if (showAlphanumericToast) {
          if (toastTimeoutRef.current) {
            clearTimeout(toastTimeoutRef.current);
          }
          setShowToast(true);
          toastTimeoutRef.current = setTimeout(() => setShowToast(false), 3000);
        }
      }
    };

    // URL 타입 핸들러들
    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;

      if (urlRegex.test(inputValue)) {
        handleInputChange(inputValue);
      }
    };

    const handleUrlKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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

      if (!allowedKeys.includes(event.key) && !urlRegex.test(event.key)) {
        event.preventDefault();

        // 토스트 메시지 표시
        if (showUrlToast) {
          if (toastTimeoutRef.current) {
            clearTimeout(toastTimeoutRef.current);
          }
          setShowToast(true);
          toastTimeoutRef.current = setTimeout(() => setShowToast(false), 3000);
        }
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        onEnterKeyDown?.();
      }

      onKeyDown?.(event);
    };

    const handleUrlPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
      const pastedText = event.clipboardData.getData('text');

      if (!urlRegex.test(pastedText)) {
        event.preventDefault();

        // 토스트 메시지 표시
        if (showUrlToast) {
          if (toastTimeoutRef.current) {
            clearTimeout(toastTimeoutRef.current);
          }
          setShowToast(true);
          toastTimeoutRef.current = setTimeout(() => setShowToast(false), 3000);
        }
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
      <div
        className={cn(
          styles.start,
          borderNone && styles.bd_none,
          isFocused && styles.focused,
          disabled && styles.disabled,
          readOnly && styles.read_only,
          error ? styles.error : '',
          'nlp--input',
        )}
      >
        <div className={styles.before_area}>
          {/* prefixText */}
          {prefixText && <div className={styles.unit}>{prefixText}</div>}
        </div>
        {type === 'number' ? (
          <NumericFormat
            {...props}
            getInputRef={ref}
            id={id}
            className={cn(styles.input, className, error ? styles.error : '')}
            value={value}
            thousandSeparator={thousandSeparator}
            placeholder={placeholderText}
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
            placeholder={placeholderText}
            allowEmptyFormatting={allowEmptyFormatting}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onValueChange={(values) => {
              handleInputChange(values.value);
            }}
            maxLength={maxLength}
          />
        ) : type === 'alphanumeric' || inputType === 'alphanumeric' ? (
          <input
            ref={ref}
            id={id}
            value={value || ''}
            readOnly={readOnly}
            disabled={disabled}
            type="text"
            placeholder={placeholderText}
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
        ) : type === 'url' || inputType === 'url' ? (
          <input
            ref={ref}
            id={id}
            value={value || ''}
            readOnly={readOnly}
            disabled={disabled}
            type="text"
            placeholder={placeholderText}
            className={cn(
              styles.input,
              className,
              borderNone ? styles.bd_none : '',
              error ? styles.error : '',
            )}
            onKeyDown={handleUrlKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChange={handleUrlChange}
            onPaste={handleUrlPaste}
            maxLength={maxLength}
          />
        ) : type === 'file' ? (
          <input
            ref={ref}
            id={id}
            value={value || ''}
            readOnly={readOnly}
            disabled={disabled}
            type={type}
            placeholder={placeholderText}
            className={cn(styles.input, className)}
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
            accept={props.accept}
          />
        ) : (
          <input
            ref={ref}
            id={id}
            value={value || ''}
            readOnly={readOnly}
            disabled={disabled}
            type={type}
            placeholder={placeholderText}
            className={cn(styles.input, className)}
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
        <div className={cn(styles.after_area)}>
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
          {/* suffixText */}
          {suffixText && <div className={styles.unit}>{suffixText}</div>}
          {/* 입력글자수/최대입력가능글자수 */}
          {!hideInputLength &&
            maxLength &&
            (type === 'text' ||
              type === 'password' ||
              type === 'alphanumeric' ||
              type === 'url' ||
              inputType === 'alphanumeric' ||
              inputType === 'url') && (
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
