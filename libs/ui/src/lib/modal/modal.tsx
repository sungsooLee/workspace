import React from 'react';

import * as Primitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

import { BaseModalProps } from './type';
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
  hideCloseButton = false,
}) => {
  const handleOpenChange = (open: boolean) => {
    onClose?.();
  };

  return (
    <Primitive.Root open={true} onOpenChange={handleOpenChange}>
      <Primitive.Portal>
        <Primitive.Overlay className={styles.Overlay} />
        <Primitive.Content className={styles.Content}>
          {/* title */}
          <Primitive.Title className={styles.Title}>{title}</Primitive.Title>

          {/* description */}
          <Primitive.Description className={styles.Description}>
            {description}
          </Primitive.Description>

          {/* children */}
          <div className={styles.ContentBody}>{children}</div>

          {/* footer */}
          {footer && (
            <div className={styles.Footer}>
              <Primitive.Close asChild>
                <button className={`${styles.Button} green`}>{footer}</button>
              </Primitive.Close>
            </div>
          )}

          {/* close button */}
          {!hideCloseButton && (
            <Primitive.Close asChild>
              <button className={styles.IconButton} aria-label="Close">
                <Cross2Icon />
              </button>
            </Primitive.Close>
          )}
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
};

export const Modal = ModalComponent;
