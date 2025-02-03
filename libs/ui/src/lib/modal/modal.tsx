import React, { useEffect, useRef, useState } from 'react';

import * as Primitive from '@radix-ui/react-dialog';
import { IcoXclose } from '@learnway/icons';

import { BaseModalProps } from './type';
import { cn } from '@learnway/shared';
import styles from './modal.module.css';

const ModalComponent: React.FC<BaseModalProps> = ({
  title,
  description,
  children,
  footer,
  preventBackdropClose = false,
  onClose,
  width = 'auto',
  height = 'auto',
  hideCloseButton = false,
}) => {
  const handleOpenChange = (open: boolean) => {
    onClose?.();
  };

  return (
    <Primitive.Root open={true} onOpenChange={handleOpenChange}>
      <Primitive.Portal>
        <Primitive.Overlay className={styles.overlay} />
        <Primitive.Content className={cn(styles.content, width && styles[width])}>
          {/* title */}
          <Primitive.Title className={styles.title}>{title}</Primitive.Title>

          {/* description */}
          <Primitive.Description className={styles.description}>
            {description}
          </Primitive.Description>

          {/* children */}
          <div className={styles.content_body}>
            <div className={`${styles.contents} ${styles.scroll}`}>{children}</div>
          </div>

          {/* footer */}
          {footer && (
            <div className={styles.footer}>
              {footer}
              {/* <Primitive.Close asChild>
                <button className={`${styles.Button} green`}>{footer}</button>
              </Primitive.Close> */}
            </div>
          )}

          {/* close button */}
          {!hideCloseButton && (
            <Primitive.Close asChild>
              <button className={styles.btn_close} aria-label="Close">
                <IcoXclose width={24} height={24} stroke="#131C30" />
              </button>
            </Primitive.Close>
          )}
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
};

export const Modal = ModalComponent;
