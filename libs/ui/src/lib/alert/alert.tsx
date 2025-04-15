import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { Button } from '../button/button';
import { IcoAlertComplete, IcoCaution, IcoError, IcoWarning } from '@learnway/icons'; // icon
import styles from './alert.module.css';
import { useModal } from '../modal/modal.hook';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle } from '@learnway/ui';
import { cn } from '@learnway/shared';

export interface AlertComponentProps {
  className?: string;
  icon?: React.ReactNode;
  title?: React.ReactNode | string;
  description?: React.ReactNode | string;
  content?: React.ReactNode | string;
  footer?: React.ReactNode;
  onClose?: (data?: any) => void;
  okButtonLabel?: string;
  cancelButtonLabel?: string;
  isConfirm?: boolean;
  type?: 'error' | 'warning' | 'complete' | 'caution'; // icon type
}

const AlertComponent = forwardRef<HTMLDivElement, AlertComponentProps>(
  (
    {
      className,
      icon, // icon 추가
      title,
      description,
      content,
      footer,
      okButtonLabel = '확인',
      cancelButtonLabel = '취소',
      isConfirm = false,
      type,
      onClose,
      ...otherProps
    },
    ref,
  ) => {
    const { close: closeModal } = useModal();

    // description scroll check Start
    const MAX_HEIGHT = 160;

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

    const Icon = () => {
      switch (type) {
        case 'error':
          return <IcoError width={48} height={48} stroke="#FF4646" />; // 에러 아이콘
        case 'warning':
          return <IcoWarning width={48} height={48} stroke="#FF4646" />; // 경고 아이콘
        case 'complete':
          return <IcoAlertComplete width={48} height={48} stroke="#00AFD5" />; // 완료 아이콘
        case 'caution':
          return <IcoCaution width={48} height={48} stroke="#8C97AE" />; // 주의 아이콘
        default:
          return null;
      }
    };

    const handleClose = (confirmed: boolean) => {
      closeModal(confirmed);
    };

    const defaultFooter = isConfirm ? (
      <div className={styles.btn_wrap}>
        <Button
          variant="gray"
          size="lg"
          className={styles.btn_cancel}
          onClick={() => handleClose(false)}
        >
          {cancelButtonLabel}
        </Button>
        <Button
          variant="primary"
          size="lg"
          className={styles.btn_confirm}
          onClick={() => handleClose(true)}
        >
          {okButtonLabel}
        </Button>
      </div>
    ) : (
      <div className={styles.btn_wrap}>
        <Button variant="primary" size="lg" onClick={() => handleClose(true)}>
          {okButtonLabel}
        </Button>
      </div>
    );

    return (
      <ModalContainer className={cn(styles.root, styles.alert_wrap, 'nlp--alert')}>
        <ModalTitle>
          <>
            <div className={styles.icon}>
              <Icon />
            </div>
            <div className={styles.title}>{title}</div>
          </>
        </ModalTitle>
        {content && (
          <ModalBody>
            <div className={styles.content}>{content}</div>
          </ModalBody>
        )}
        <ModalFooter>
          <div className={styles.alert_footer}>{footer ?? defaultFooter}</div>
        </ModalFooter>
      </ModalContainer>
    );

    // return (
    //   <div className={cn(styles.root, styles.alert_wrap, 'nlp--alert')}>
    //     {/* icon */}
    //     {iconVisible && <div className={styles.icon}>{iconCase()}</div>}
    //
    //     {/* title */}
    //     <div className={styles.title}>{title}</div>
    //
    //     {/* description */}
    //     {description && (
    //       <div
    //         ref={descriptionRef}
    //         className={`${styles.description} ${isScrolled ? styles.scroll : ''}`}>
    //         {description}
    //       </div>
    //     )}
    //
    //     {/* content */}
    //     <div className={styles.content}>{content}</div>
    //
    //     {/* footer */}
    //     <div className={styles.footer}>{footer ?? defaultFooter}</div>
    //   </div>
    // );
  },
);

export const Alert = AlertComponent;
