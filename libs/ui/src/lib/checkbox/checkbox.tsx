import React, { forwardRef } from 'react';
import * as Primitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

import { cn, getRandomId } from '@learnway/shared';

import styles from "./checkbox.module.scss";

export interface CheckboxComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  label?: string;
  hideLabel?: boolean;
}

const CheckboxComponent = forwardRef<
  React.ElementRef<typeof Primitive.Root>,
  CheckboxComponentProps
>(
  ({ value, onChange, disabled, className, label, hideLabel, ...props}, ref) => {
    const uuid = getRandomId();
    return (
      <div className={cn(styles.start, 'nlp--checkbox')}>
        <Primitive.Root
          {...props}
          id={uuid}
          className={styles.checkbox_root}
          disabled={disabled}
        >
          <Primitive.Indicator className={styles.checkbox_indicator}>
            <CheckIcon />
          </Primitive.Indicator>
        </Primitive.Root>
        {!hideLabel && (
          <label className={styles.label} htmlFor={uuid}>
            {label}
          </label>
        )}
      </div>

      // <div className="flex items-center space-x-2">
      //   <Primitive.Root
      //     //   id={name}
      //     ref={ref}
      //     checked={value}
      //     onCheckedChange={onChange}
      //     disabled={disabled}
      //     className={cn(
      //       'group-[.has-error]:border-red-500 group-[.has-error]:focus:border-red-500',
      //       disabled && 'cursor-not-allowed opacity-50',
      //       className,
      //     )}
      //   />
      //   {checkboxLabel && (
      //     <label
      //       className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      //       {checkboxLabel}
      //     </label>
      //   )}
      // </div>
    );
  }
);

export const Checkbox = CheckboxComponent;
