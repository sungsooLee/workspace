import React, { forwardRef } from 'react';

import { cn } from '@learnway/shared';

import { Button } from '../button/button';
import { useModalContext } from '../modal/modal-context';

import styles from './alert.module.css';

export interface AlertComponentProps {
  className?: string;
  title?: string;
  description?: string;
  content?: React.ReactNode | string;
  footer?: React.ReactNode;
  onClose?: () => void;
  okButtonLabel?: string;
  cancelButtonLabel?: string;
  isConfirm?: boolean;
}

const AlertComponent = forwardRef<HTMLDivElement, AlertComponentProps>(
  ({ className, title, description, content, footer, okButtonLabel = '확인', cancelButtonLabel = '취소', isConfirm = false, ...otherProps }, ref) => {

    const { closeModal } = useModalContext();

    const defaultFooter = isConfirm ? (
      <>
        <Button onClick={() => closeModal()}>{cancelButtonLabel}</Button>
        <Button onClick={() => closeModal()}>{okButtonLabel}</Button>
      </>
    ) : (
      <>
        <Button onClick={() => closeModal()}>{okButtonLabel}</Button>
      </>
    )

    return (
      <div className={cn(styles.root, className, 'nlp--alert')}>

        {/* title */}
        <div className={styles.title}>
          {title}
        </div>

        {/* description */}
        {description && (
          <div className={styles.description}>
            {description}
          </div>
        )}

        {/* content */}
        <div className={styles.content}>
          {content}
        </div>

        {/* footer */}
        <div className={styles.footer}>
          {footer ?? defaultFooter}
        </div>

      </div>
    )
  },
);

export const Alert = AlertComponent;
