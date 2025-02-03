import React, { forwardRef, useState } from 'react';

import * as Primitive from '@radix-ui/react-toast';

import { ToastConfig } from './type';

import styles from './toast.module.css';

export interface ToastComponentProps {
  className?: string;
  config: ToastConfig;
  onClose?: () => void;
}

const ToastComponent = forwardRef<React.ElementRef<typeof Primitive.Root>, ToastComponentProps>(
  ({ className, onClose, config: { title, description } }) => {
    const [open, setOpen] = useState(true);

    const handleOpenChange = (value: boolean) => {
      setOpen(value);
      !value && onClose && onClose();
    };

    return (
      <Primitive.Root className={styles.Root} open={open} onOpenChange={handleOpenChange}>
        {/* Title*/}
        <Primitive.Title className={styles.Title}>{title}</Primitive.Title>

        {/* Description */}
        <Primitive.Description className={styles.Description}>{description}</Primitive.Description>
      </Primitive.Root>
    );
  },
);

export const Toast = ToastComponent;
