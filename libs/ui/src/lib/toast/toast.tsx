import React, { forwardRef, useState } from 'react';

import * as Primitive from '@radix-ui/react-toast';

import { ToastConfig } from './type';

import styles from './toast.module.css';
import { cn } from '@learnway/shared';

export interface ToastComponentProps {
  className?: string;
  config: ToastConfig;
  onClose?: () => void;
}

const ToastComponent = forwardRef<React.ElementRef<typeof Primitive.Root>, ToastComponentProps>(
  ({ className, onClose, config }, ref) => {
    const [open, setOpen] = useState(true);
    const { title, description, size = 'medium', type = 'info', showCloseButton = false } = config;

    const handleOpenChange = (value: boolean) => {
      setOpen(value);
      !value && onClose && onClose();
    };

    const handleCloseClick = () => {
      setOpen(false);
      onClose && onClose();
    };

    return (
      <Primitive.Root
        className={cn(
          styles.root,
          size && styles[size],
          // type && styles[type],
          className,
        )}
        open={open}
        onOpenChange={handleOpenChange}
        ref={ref}
      >
        <div className={styles.content}>
          {/* Title */}
          <Primitive.Title className={styles.title}>{title}</Primitive.Title>

          {/* Description */}
          {description && (
            <Primitive.Description className={styles.description}>
              {description}
            </Primitive.Description>
          )}
        </div>

        {/* Close Button */}
        {showCloseButton && (
          <Primitive.Close className={styles.close} onClick={handleCloseClick}>
            ×
          </Primitive.Close>
        )}
      </Primitive.Root>
    );
  },
);

export const Toast = ToastComponent;
