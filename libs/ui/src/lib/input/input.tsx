import { forwardRef, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@learnway/shared';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, disabled, onBlur, onChange, value, placeholder }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState(value);

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

    const baseStyles = cn(
      'w-full rounded-md border px-3 py-2 text-sm',
      'border-gray-300 bg-white text-gray-900',
      'placeholder:text-gray-500',
      'focus:outline-none focus:border-blue-500',
      'overflow-hidden whitespace-nowrap text-ellipsis',
      'group-[.has-error]:border-red-500 group-[.has-error]:focus:border-red-500',
      {
        'border-gray-200 bg-gray-100 text-gray-500 text-gray-400 cursor-not-allowed': disabled,
      },
    );

    return (
      <div className="relative w-full">
        <input
          className={cn(baseStyles, className)}
          type={type}
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
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
        <div className="absolute bottom-0 right-0 top-0 flex w-8 items-center justify-center">
          {isFocused && value && value.toString().length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              onMouseDown={handleMouseDown}
              className={cn(
                'rounded-full p-1 hover:bg-gray-100',
                'text-gray-400 hover:text-gray-600',
                'focus:outline-none',
              )}>
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = 'FormInput';

export default Input;
