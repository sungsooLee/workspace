import React from 'react';

import { cn } from '@learnway/shared';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../shadcn/dialog';
import { BaseModalProps } from './type';
import styles from './modal.module.scss';

const ModalComponent: React.FC<BaseModalProps> = ({
  title,
  description,
  children,
  footer,
  preventBackdropClose = false,
  onClose,
  width = 'lg',
  height = 'auto',
}) => {
  const handleOpenChange = (open: boolean) => {
    onClose?.();
  };

  const sizeClasses = {
    sm: 'max-w-m',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw]',
  };

  const heightClasses = {
    auto: 'h-auto',
    sm: 'h-[300px]',
    md: 'h-[500px]',
    lg: 'h-[700px]',
    full: 'h-[95vh]',
  };

  return (
    <Dialog open={true} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          styles.modal_wrap,
          heightClasses[height],
          sizeClasses[width],
          'transition-all duration-200',
          'nlp--modal-content',
        )}>
        {(title || description) && (
          <DialogHeader className={cn(styles.modal_header, 'nlp--modal-header')}>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}

        <div className={styles.modal_content}>{children}</div>

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export const Modal = ModalComponent;
