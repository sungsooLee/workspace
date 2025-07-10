/* eslint-disable react/jsx-no-useless-fragment */
import React, { forwardRef, useState } from 'react';

import * as Primitive from '@radix-ui/react-toast';

import { ToastConfig } from './type';
import { toastIcons } from './toast-icons';

import { IcoClose02 } from '@learnway/icons';
import styles from './toast.module.css';
import { cn } from '@learnway/shared';
import { Button } from '../button/button';

export interface ToastComponentProps {
  className?: string;
  config: ToastConfig;
  onClose?: () => void;
}

const ToastComponent = forwardRef<React.ElementRef<typeof Primitive.Root>, ToastComponentProps>(
  ({ className, onClose, config }, ref) => {
    const [open, setOpen] = useState(true);
    const {
      title,
      description,
      size = 'medium',
      type,
      showCloseButton = false,
      actionLabel,
      onActionClick,
    } = config;

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
        className={cn(styles.root, size && styles[size], className)}
        open={open}
        onOpenChange={handleOpenChange}
        duration={config.duration}
        ref={ref}
      >
        <div className={styles.content}>
          {/* Icons */}
          {type && <span className={styles.type_icon}>{toastIcons[type]}</span>}

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
            <IcoClose02 />
          </Primitive.Close>
        )}

        {/* Link Button */}
        {actionLabel && (
          <Button
            label={actionLabel}
            className={styles.btn_action}
            variant={'arrow'}
            onClick={onActionClick}
          />
        )}
      </Primitive.Root>
    );
  },
);

export const Toast = ToastComponent;
