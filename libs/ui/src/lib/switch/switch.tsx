import React, { forwardRef } from 'react';
import * as Primitive from '@radix-ui/react-switch';

import { cn } from '@learnway/shared';
import styles from './switch.module.css';

export interface SwitchComponentProps extends React.ComponentProps<typeof Primitive.Root> {
  id?: string;
  label?: string;
  className?: string;
}

const SwitchComponent = forwardRef<React.ElementRef<typeof Primitive.Root>, SwitchComponentProps>(
  ({ id, label, className, ...props }, ref) => {
    return (
      <div className={cn(styles.start, styles.switch, className, 'nlp--switch')}>
        <Primitive.Root className={styles.switch_root} id={id}>
          <Primitive.Thumb className={styles.switch_thumb} />
        </Primitive.Root>
        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}
      </div>
    );
  },
);

export const Switch = SwitchComponent;
