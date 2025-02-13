import { forwardRef, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { Input } from './input';
import styles from './input.module.css';
import { cn } from '@learnway/shared';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  limit?: string | number;
}

const InputLimitComponent = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ limit = 100, value = '', onChange, ...props }, ref) => {
    const [count, setCount] = useState(0);

    const handleOnChange = (e: any) => {
      if (e.target.value.length < 8) {
        onChange(e.target.value);
      }
    };

    useEffect(() => {
      setCount(value.length);
    }, [value]);
    return (
      <div className={cn(styles.input_box, styles.line)}>
        <Input ref={ref} value={value} onChange={handleOnChange} {...props} />
        <span className={styles.count}>
          <em className={styles.num}>{count}</em>/{limit}
        </span>
      </div>
    );
  },
);

export const InputLimit = InputLimitComponent;
