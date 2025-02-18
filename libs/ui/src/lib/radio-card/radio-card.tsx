import React, { forwardRef } from 'react';
import * as Primitive from '@radix-ui/react-radio-group';

import { cn } from '@learnway/shared';

import { RadioCardOption } from './type';
import styles from './radio-card.module.css';

export interface RadioCardComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  options: RadioCardOption[];
  orientation?: 'vertical' | 'horizontal';
  defaultValue?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg'; // 12, 16, 18, 24(basic)
  onValueChange?: (value: string) => void;
  hiddenIndicator?: boolean;
}

const RadioCardComponent = forwardRef<
  React.ElementRef<typeof Primitive.Root>,
  RadioCardComponentProps
>(
  (
    {
      className,
      options,
      disabled,
      defaultValue,
      size,
      orientation = 'horizontal',
      hiddenIndicator = false,
      ...props
    },
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
        {options.map((option: RadioCardOption) => (
          <div className={styles.radio}>
            <Primitive.Item
              key={option.value}
              className={styles.item}
              value={option.value}
              id={option.value}
              disabled={disabled}>
              {hiddenIndicator ? (
                option.label
              ) : (
                <Primitive.Indicator className={styles.indicator} />
              )}
            </Primitive.Item>
            {hiddenIndicator === false && (
              <label className={styles.label} htmlFor={option.value}>
                {option.label}
              </label>
            )}
          </div>
        ))}
      </Primitive.Root>
    );
  },
);

export const RadioCard = RadioCardComponent;
