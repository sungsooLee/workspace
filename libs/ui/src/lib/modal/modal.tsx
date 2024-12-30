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

const BaseModal: React.FC<BaseModalProps> = ({
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

  const sizeClasses = {
    sm: 'max-w-sm',
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
          heightClasses[height],
          sizeClasses[width],
          'transition-all duration-200',
          'nlp--modal-content',
        )}>
        {(title || description) && (
          <DialogHeader className="nlp--modal-header">
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
