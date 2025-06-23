import React, { forwardRef } from 'react';
import * as Primitive from '@radix-ui/react-radio-group';

import { cn } from '@learnway/shared';

import { RadioGroupOption } from './type';
import styles from './radio-group.module.css';

export interface RadioGroupComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  value?: string;
  options: RadioGroupOption[];
  orientation?: 'vertical' | 'horizontal';
  defaultValue?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg'; // 12, 16, 18, 24(basic)
  name?: string;
  cols?: number;
  onValueChange?: (value: string) => void;
}

const RadioGroupComponent = forwardRef<
  React.ElementRef<typeof Primitive.Root>,
  RadioGroupComponentProps
>(
  (
    {
      value,
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
          'nlp--radio',
          styles.start,
          size && styles[size],
          orientation === 'vertical' && styles.vertical,
          className,
        )}
        defaultValue={defaultValue}
        value={value}
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
                id={uniqueId}
                value={option.value}
                className={styles.item}
                disabled={disabled}
              >
                <Primitive.Indicator className={styles.indicator} />
              </Primitive.Item>
              <label className={styles.label} htmlFor={uniqueId}>
                {option.label}
              </label>
              {/* 커스텀 노드 */}
              {option.value === value && option.node && (
                <span className={styles.node}>{option.node}</span>
              )}
            </div>
          );
        })}
      </Primitive.Root>
    );
  },
);

export const RadioGroup = RadioGroupComponent;
