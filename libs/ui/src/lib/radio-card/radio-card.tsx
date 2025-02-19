import React, { forwardRef } from 'react';
import * as Primitive from '@radix-ui/react-radio-group';

import { cn } from '@learnway/shared';

import { RadioCardOption } from './type';
import styles from './radio-card.module.css';

export interface RadioCardComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  options: RadioCardOption[];
  orientation?: 'vertical' | 'horizontal';
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const RadioCardComponent = forwardRef<
  React.ElementRef<typeof Primitive.Root>,
  RadioCardComponentProps
>(({ className, options, disabled, defaultValue, orientation = 'horizontal', ...props }, ref) => {
  return (
    <Primitive.Root
      className={cn(
        styles.start,
        'nlp--radio',
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
            {option.label}
          </Primitive.Item>
        </div>
      ))}
    </Primitive.Root>
  );
});

export const RadioCard = RadioCardComponent;
