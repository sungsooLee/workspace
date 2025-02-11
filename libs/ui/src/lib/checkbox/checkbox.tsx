import React, { forwardRef } from 'react';
import * as Primitive from '@radix-ui/react-checkbox';
import { IcoCheckboxChecked } from '@learnway/icons';

import { cn, getRandomId } from '@learnway/shared';

import styles from './checkbox.module.css';

export interface CheckboxComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  label?: string;
  hideLabel?: boolean;
}

const CheckboxComponent = forwardRef<
  React.ElementRef<typeof Primitive.Root>,
  CheckboxComponentProps
>(({ value, onChange, disabled, className, label, hideLabel, ...props }, ref) => {
  const uuid = getRandomId();
  return (
    <div className={cn(styles.start, 'nlp--checkbox', className)}>
      <Primitive.Root
        {...props}
        id={uuid}
        ref={ref}
        className={styles.checkbox_root}
        disabled={disabled}
        type={'button'}>
        <Primitive.Indicator className={styles.checkbox_indicator}>
          <IcoCheckboxChecked width={12} height={13} fill="none" stroke="#ffffff" />
        </Primitive.Indicator>
      </Primitive.Root>
      {!hideLabel && (
        <label className={styles.label} htmlFor={uuid}>
          {label}
        </label>
      )}
    </div>
  );
});

export const Checkbox = CheckboxComponent;
