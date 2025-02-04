import { forwardRef, InputHTMLAttributes, useEffect, useRef, useState } from 'react';

import { cn } from '@learnway/shared';
import { IcoDelete03 } from '@learnway/icons';

import styles from './input.module.css';

const InputComponent = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, id, type, disabled, readOnly, onBlur, onChange, value, placeholder }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const hasNoBorder = className?.includes('bd_none');
    const sizeLarge = className?.includes('lg');
    const errorCase = className?.includes('error');

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      if (onChange) {
        onChange(e);
      }
    };

    const handleClear = () => {
      if (onChange) {
        const event = {
          target: {
            value: '',
          },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (inputRef.current && value) {
        //
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      if (inputRef.current) {
        inputRef.current.setSelectionRange(0, 0);
      }
      if (onBlur) {
        onBlur(e);
      }
    };

    const baseStyles = cn('', {
      'cursor-not-allowed': disabled,
    });

    return (
      <div className={cn(styles.start, 'nlp--input')}>
        <input
          className={`${styles.input} ${baseStyles} ${hasNoBorder ? styles.bd_none : ''} ${sizeLarge ? styles.lg : ''} ${errorCase ? styles.error : ''} ${className}`}
          type={type}
          id={id}
          ref={(el) => {
            inputRef.current = el;
            if (typeof ref === 'function') {
              ref(el);
            } else if (ref) {
              ref.current = el;
            }
          }}
          value={inputValue}
          disabled={disabled}
          readOnly={readOnly}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
        <div className={cn(styles.button, '')}>
          {isFocused && value && value.toString().length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              onMouseDown={handleMouseDown}
              className={cn(styles.clear, 'focus:outline-none')}>
              <IcoDelete03 width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
            </button>
          )}
        </div>
      </div>
    );
  },
);

export const Input = InputComponent;

// Input.displayName = 'FormInput';
// export default Input;
