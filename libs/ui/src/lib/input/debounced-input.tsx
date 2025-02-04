import React, { forwardRef, useEffect, useState, useCallback } from 'react';
import { cn } from '@learnway/shared';
import { Input } from './input';

import styles from './debounced-input.module.css';

interface DebouncedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string | number;
  onChange: (value: string | number) => void;
  debounceTimeout?: number;
  className?: string;
}

const DebouncedInput = forwardRef<HTMLInputElement, DebouncedInputProps>(
  ({ value: initialValue, onChange, debounceTimeout = 100, className, ...props }, ref) => {
    const [value, setValue] = useState<string | number>(initialValue);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    const debouncedCallback = useCallback(
      (value: string | number) => {
        onChange(value);
      },
      [onChange],
    );

    useEffect(() => {
      if (value === initialValue) {
        return;
      }

      const timeout = setTimeout(() => {
        debouncedCallback(value);
      }, debounceTimeout);

      return () => clearTimeout(timeout);
    }, [value, debounceTimeout, debouncedCallback, initialValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return (
      <Input
        {...props}
        ref={ref}
        value={value}
        onChange={handleChange}
        className={cn(styles.start, 'w-full', className)}
      />
    );
  },
);

DebouncedInput.displayName = 'DebouncedInput';

export default DebouncedInput;
