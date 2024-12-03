import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../shadcn/dialog';
import { BaseModalProps } from './type';

const BaseModal: React.FC<BaseModalProps> = ({
  title,
  description,
  children,
  footer,
  preventBackdropClose = false,
  onClose,
}) => {
  const handleOpenChange = (open: boolean) => {
    if (!open && !preventBackdropClose) {
      onClose?.();
    }
  };

  return (
    <Dialog open={true} onOpenChange={handleOpenChange}>
      <DialogContent>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}

        <div className="py-4">{children}</div>

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default BaseModal;
