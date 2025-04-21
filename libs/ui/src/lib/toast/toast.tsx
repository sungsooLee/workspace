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
  ({ className, onClose, config: { title, description } }, ref) => {
    const [open, setOpen] = useState(true);

    const handleOpenChange = (value: boolean) => {
      setOpen(value);
      !value && onClose && onClose();
    };

    return (
      <Primitive.Root className={styles.root} open={open} onOpenChange={handleOpenChange} ref={ref}>
        {/* Title*/}
        <Primitive.Title className={styles.title}>{title}</Primitive.Title>

        {/* Description */}
        <Primitive.Description className={styles.description}>{description}</Primitive.Description>
      </Primitive.Root>
    );
  },
);

export const Toast = ToastComponent;
