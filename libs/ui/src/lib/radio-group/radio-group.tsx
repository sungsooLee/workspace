import * as Primitive from '@radix-ui/react-radio-group';
import React, { forwardRef, useEffect, useRef } from 'react';

import { cn, stringify } from '@learnway/shared';

import styles from './radio-group.module.css';
import { RadioGroupOption } from './type';

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
      onValueChange,
      ...props
    },
    ref,
  ) => {
    const prevOptionsRef = useRef<string>('');

    const handleValueChange = (newValue: string) => {
      onValueChange?.(newValue);
    };

    // options 배열이 이전 값과 동일하면 useEffect가 재실행되지 않도록 JSON.stringify로 비교

    useEffect(() => {
      const optionsString = stringify(options);
      // options가 이전과 동일하면 실행하지 않음
      if (prevOptionsRef.current === optionsString) {
        return;
      }
      // options 값 업데이트
      prevOptionsRef.current = optionsString;
      // 첫 번째 옵션 값 설정
      const firstValue = options?.[0]?.value;
      if (firstValue !== undefined) {
        handleValueChange(firstValue);
      }
      console.log('radio-group options', options);
    }, [options]);

    return (
      <Primitive.Root
        className={cn(
          'nlp--radio',
          styles.start,
          size && styles[size],
          size,
          orientation === 'vertical' && styles.vertical,
          orientation,
          className,
        )}
        defaultValue={defaultValue}
        value={value}
        onValueChange={handleValueChange}
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
