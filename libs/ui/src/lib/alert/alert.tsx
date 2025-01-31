import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { cn } from '@learnway/shared';

import { Button } from '../button/button';
import { useModalContext } from '../modal/modal-context';

import styles from './alert.module.css';

// description Height check
const MAX_HEIGHT = 160;

export interface AlertComponentProps {
  className?: string;
  title?: string;
  description?: React.ReactNode | string;
  content?: React.ReactNode | string;
  footer?: React.ReactNode;
  onClose?: () => void;
  okButtonLabel?: string;
  cancelButtonLabel?: string;
  isConfirm?: boolean;
}

const AlertComponent = forwardRef<HTMLDivElement, AlertComponentProps>(
  (
    {
      className,
      title,
      description,
      content,
      footer,
      okButtonLabel = '확인',
      cancelButtonLabel = '취소',
      isConfirm = false,
      ...otherProps
    },
    ref,
  ) => {
    const { closeModal } = useModalContext();

    // description scroll check Start
    const descriptionRef = useRef<HTMLDivElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const checkHeight = () => {
        if (descriptionRef.current) {
          setIsScrolled(descriptionRef.current.scrollHeight > MAX_HEIGHT);
        }
      };

      // 초기 체크
      checkHeight();

      // ResizeObserver로 크기 변화 감지
      const observer = new ResizeObserver(checkHeight);
      if (descriptionRef.current) {
        observer.observe(descriptionRef.current);
      }

      return () => observer.disconnect();
    }, []);
    // description scroll check End

    const defaultFooter = isConfirm ? (
      <div className={styles.btn_wrap}>
        <Button variant="gray" size="lg" className={styles.btn_cancel} onClick={() => closeModal()}>
          {cancelButtonLabel}
        </Button>
        <Button
          variant="primary"
          size="lg"
          className={styles.btn_confirm}
          onClick={() => closeModal()}>
          {okButtonLabel}
        </Button>
      </div>
    ) : (
      <div className={styles.btn_wrap}>
        <Button variant="primary" size="lg" onClick={() => closeModal()}>
          {okButtonLabel}
        </Button>
      </div>
    );

    return (
      <div className={cn(styles.root, className, 'nlp--alert')}>
        {/* title */}
        <div className={styles.title}>{title}</div>

        {/* description */}
        {description && (
          <div
            ref={descriptionRef}
            className={`${styles.description} ${isScrolled ? styles.scroll : ''}`}>
            {description}
          </div>
        )}

        {/* content */}
        <div className={styles.content}>{content}</div>

        {/* footer */}
        <div className={styles.footer}>{footer ?? defaultFooter}</div>
      </div>
    );
  },
);

export const Alert = AlertComponent;
