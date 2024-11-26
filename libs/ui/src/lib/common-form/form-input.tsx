import { forwardRef, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@learnway/shared';

export type FormMode = 'read' | 'edit';

export interface InputProps extends React.ComponentProps<'input'> {
  error: boolean;
  mode?: FormMode;
}

const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, mode = 'edit', type, disabled, onBlur, onChange, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    if (mode === 'read') {
      return (
        <div className={cn('w-full py-2 text-sm text-gray-900', className)}>
          {props.value || '-'}
        </div>
      );
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
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
      // if (inputRef.current && props.value) {
      // }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      console.log('blur');
      setIsFocused(false);
      if (inputRef.current) {
        console.log(inputRef.current);
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
      {
        'border-red-500 focus:border-red-500': props['aria-invalid'],
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
          }}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={onChange}
          {...props}
        />
        <div className="absolute right-0 top-0 bottom-0 w-8 flex items-center justify-center">
          {isFocused && props.value && props.value.toString().length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              onMouseDown={handleMouseDown}
              className={cn(
                'p-1 rounded-full hover:bg-gray-100',
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

FormInput.displayName = 'FormInput';

export { FormInput };
