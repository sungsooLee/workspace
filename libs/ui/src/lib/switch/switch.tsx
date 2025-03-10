import React, { forwardRef } from 'react';
import * as Primitive from '@radix-ui/react-switch';

import { cn } from '@learnway/shared';
import styles from './switch.module.css';

export interface SwitchComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  id?: string;
  label?: string;
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  reversed?: boolean; // label이 앞에 있는 Case
  labelAlign?: 'left' | 'right';
  showLabel?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const SwitchComponent = forwardRef<React.ElementRef<typeof Primitive.Root>, SwitchComponentProps>(
  (
    {
      id,
      label,
      className,
      checked,
      disabled,
      reversed,
      labelAlign = 'left',
      showLabel = true,
      // onChange,
      onCheckedChange, // onChange 대신 onCheckedChange로 수정
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          styles.start,
          styles.switch,
          className,
          'nlp--switch',
          checked && styles.active,
          {
            [styles.reversed]: reversed,
          },
        )}>
        {/* left label */}
        {labelAlign === 'left' && showLabel && label && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}

        {/* Switch Button */}
        <Primitive.Root
          className={styles.switch_root}
          id={id}
          checked={checked}
          disabled={disabled}
          onCheckedChange={onCheckedChange}>
          <Primitive.Thumb className={styles.switch_thumb} />
        </Primitive.Root>

        {/* right label */}
        {labelAlign === 'right' && showLabel && label && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}
      </div>
    );
  },
);

export const Switch = SwitchComponent;
