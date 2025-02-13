import React, { forwardRef } from 'react';
import * as Primitive from '@radix-ui/react-radio-group';

import { cn } from '@learnway/shared';

import { RadioOption } from './type';
import styles from './radio.module.css';

export interface RadioComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  options: RadioOption[];
  orientation?: 'vertical' | 'horizontal';
  defaultValue?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg'; // 12, 16, 18, 24(basic)
  onValueChange?: (value: string) => void;
}

const RadioComponent = forwardRef<React.ElementRef<typeof Primitive.Root>, RadioComponentProps>(
  (
    { className, options, disabled, defaultValue, size, orientation = 'horizontal', ...props },
    ref,
  ) => {
    return (
      <Primitive.Root
        className={cn(
          styles.start,
          'nlp--radio',
          size && styles[size],
          className,
          // orientation === 'horizontal' ? horizontal_selector : vertical_selector (css 구현필요)
        )}
        defaultValue={defaultValue}
        {...props}>
        {options.map((option: RadioOption) => (
          <div className={styles.radio}>
            <Primitive.Item
              key={option.value}
              className={styles.item}
              value={option.value}
              id={option.value}
              disabled={disabled}>
              <Primitive.Indicator className={styles.indicator} />
            </Primitive.Item>
            <label className={styles.label} htmlFor={option.value}>
              {option.label}
            </label>
          </div>
        ))}
      </Primitive.Root>
    );
  },
);

export const Radio = RadioComponent;
