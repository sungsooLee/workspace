import React, { forwardRef } from 'react';
import * as Primitive from '@radix-ui/react-radio-group';

import { cn } from '@learnway/shared';

import { RadioGroupOption } from './type';
import styles from './radio-group.module.css';

export interface RadioGroupComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  options: RadioGroupOption[];
  orientation?: 'vertical' | 'horizontal';
  defaultValue?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg'; // 12, 16, 18, 24(basic)
  onValueChange?: (value: string) => void;
  name?: string;
  cols?: number;
}

const RadioGroupComponent = forwardRef<
  React.ElementRef<typeof Primitive.Root>,
  RadioGroupComponentProps
>(
  (
    {
      className,
      options,
      disabled,
      defaultValue,
      size,
      orientation = 'horizontal',
      name,
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
          orientation !== 'horizontal' ? styles.vertical : '',
          className,
        )}
        defaultValue={defaultValue}
        {...props}
      >
        {options.map((option: RadioGroupOption, index: number) => {
          const uniqueId = name
            ? `${name}-${option.value}_${index}`
            : `radio-${option.value}_${index}`;
          return (
            <div className={styles.radio} key={option.value}>
              <Primitive.Item
                key={uniqueId}
                className={styles.item}
                value={option.value}
                id={uniqueId}
                disabled={disabled}
              >
                <Primitive.Indicator className={styles.indicator} />
              </Primitive.Item>
              <label className={styles.label} htmlFor={uniqueId}>
                {option.label}
              </label>
            </div>
          );
        })}
      </Primitive.Root>
    );
  },
);

export const RadioGroup = RadioGroupComponent;
