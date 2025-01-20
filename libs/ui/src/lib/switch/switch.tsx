import React, { forwardRef } from 'react';
import * as Primitive from "@radix-ui/react-switch";

import { cn } from '@learnway/shared';
import styles from './switch.module.scss';

export interface SwitchComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  label?: string;
}

const SwitchComponent = forwardRef<
  React.ElementRef<typeof Primitive.Root>,
  SwitchComponentProps
>(
  ({ label, ...props }, ref) => {
    return (
      <div className={cn('nlp--switch', styles.start)}>
        <Primitive.Root className={styles.switch_root} id="airplane-mode">
          <Primitive.Thumb className={styles.switch_thumb} />
        </Primitive.Root>
        {label && (
          <label
            className={styles.label}
            htmlFor="airplane-mode"
          >
            {label}
          </label>
        )}
      </div>
    )
  },
);

export const Switch = SwitchComponent;
