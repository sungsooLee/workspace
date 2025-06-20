import { forwardRef, useMemo, useState, useRef } from 'react';

import { cn } from '@learnway/shared';

import styles from './textarea.module.css';
import { t } from 'i18next';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  dummy?: any;
  className?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  size?: 'xs' | 'sm' | 'md'; // textarea 높이(basic : md)
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  placeholder?: string;
  hiddenPlaceholder?: boolean;
  inputType?: string;
  showKoreanToast?: boolean; // 한글 타입에서 잘못된 문자 입력 시 토스트 메시지 표시 여부
}

const TextareaComponent = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = 'md',
      resize,
      className,
      disabled,
      readOnly,
      maxLength,
      value,
      onChange,
      placeholder,
      hiddenPlaceholder,
      inputType,
      showKoreanToast = true,
      ...props
    },
    ref,
  ) => {
    // const [inputValue, setInputValue] = useState(value);

    // useEffect(() => {
    //   setInputValue(value);
    // }, [value]);

    // useEffect(() => {
    //   if (value !== inputValue) {
    //     const event = {
    //       target: {
    //         value: inputValue,
    //       },
    //     } as React.ChangeEvent<HTMLTextAreaElement>;
    //     onChange?.(event);
    //   }
    // }, [inputValue]);

    // const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //   setInputValue(e.target.value);
    // };

    const placeholderText = useMemo(() => {
      if (hiddenPlaceholder) return '';
      if (placeholder) return t(placeholder);
      if (props && props.label)
        return `${t(props.label as any)} ${t('LABEL.form.input.placeholder')}`;
      return t('LABEL.form.input.placeholder');
    }, [placeholder, props?.label, hiddenPlaceholder]);

    const [showToast, setShowToast] = useState(false);
    const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 한글 + URL 허용 문자 정규식 (한글, 영문, 숫자, URL 특수문자, 공백, 개행문자 허용)
    const koreanPlusRegex = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%\s\n]*$/;

    const handleKoreanChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const inputValue = event.target.value;

      if (inputValue === '' || koreanPlusRegex.test(inputValue)) {
        onChange?.(event);
      }
    };

    const handleKoreanKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
        'Process',
      ];

      if (event.ctrlKey || event.metaKey) {
        return;
      }

      if (event.key === 'Process' || allowedKeys.includes(event.key)) {
        return;
      }

      if (!/[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9\-._~:\/?#\[\]@!$&'()*+,;=%\s]/.test(event.key)) {
        event.preventDefault();

        if (showKoreanToast) {
          if (toastTimeoutRef.current) {
            clearTimeout(toastTimeoutRef.current);
          }
          setShowToast(true);
          toastTimeoutRef.current = setTimeout(() => setShowToast(false), 3000);
        }
      }
    };

    const handleKoreanPaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const pastedText = event.clipboardData.getData('text');

      // 빈 문자열이거나 한글+URL 문자만 있는 경우 허용
      if (pastedText === '' || koreanPlusRegex.test(pastedText)) {
        return; // 기본 동작 허용
      }

      event.preventDefault();

      // 토스트 메시지 표시
      if (showKoreanToast) {
        if (toastTimeoutRef.current) {
          clearTimeout(toastTimeoutRef.current);
        }
        setShowToast(true);
        toastTimeoutRef.current = setTimeout(() => setShowToast(false), 3000);
      }
    };

    const currentLength = (value as string)?.length || 0;

    return (
      <div
        className={cn(
          styles.start,
          styles.textarea_wrap,
          disabled && styles.disabled,
          readOnly && styles.readonly,
          'textarea_wrap',
          className,
        )}
      >
        {/* textarea */}
        {inputType === 'korean' || inputType === 'koreanPlus' ? (
          <textarea
            ref={ref}
            value={value}
            className={cn(
              styles.textarea,
              className,
              'nlp--textarea',
              resize && styles[resize],
              size && styles[size],
            )}
            placeholder={placeholderText}
            maxLength={maxLength}
            disabled={disabled}
            readOnly={readOnly}
            onChange={handleKoreanChange}
            onKeyDown={handleKoreanKeyDown}
            onPaste={handleKoreanPaste}
            {...props}
          />
        ) : (
          <textarea
            ref={ref}
            value={value}
            className={cn(
              styles.textarea,
              className,
              'nlp--textarea',
              resize && styles[resize],
              size && styles[size],
            )}
            placeholder={placeholderText}
            maxLength={maxLength}
            disabled={disabled}
            readOnly={readOnly}
            onChange={onChange}
            {...props}
          />
        )}
        {/* 입력 글자수 */}
        {maxLength && (
          <p className={styles.text_limit}>
            <span className={styles.num}>{currentLength}</span>/{maxLength}
          </p>
        )}
      </div>
    );
  },
);

export const Textarea = TextareaComponent;
