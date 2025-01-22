import React from 'react';

import * as Primitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

import { BaseModalProps } from './type';
import styles from './modal.module.css';
import styles from './modal.module.scss';

const ModalComponent: React.FC<BaseModalProps> = ({
  title,
  description,
  children,
  footer,
  preventBackdropClose = false,
  onClose,
  width = 'md',
  height = 'auto',
}) => {
  const handleOpenChange = (open: boolean) => {
    onClose?.();
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
