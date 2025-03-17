import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { cn } from '@learnway/shared';

import { Button } from '../button/button';
import { IcoCaution, IcoAlertComplete, IcoError, IcoWarning } from '@learnway/icons'; // icon
import styles from './alert.module.css';
import { useModal } from '../modal/modal.hook';

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
  iconVisible?: boolean;
  isConfirm?: boolean;
  alertType?: 'error' | 'caution' | 'complete'; // icon type
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
      iconVisible = false, // icon case
      isConfirm = false,
      alertType,
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

    const iconCase = () => {
      if (!iconVisible) return null; // 아이콘이 숨겨져 있으면 null 반환

      if (isConfirm) {
        return <IcoCaution width={48} height={48} stroke="#8C97AE" />; // 컨펌창 주의 아이콘
      }

      // isConfirm이 아닌 경우의 세부 조건
      switch (alertType) {
        case 'error':
          return <IcoError width={48} height={48} stroke="#FF4646" />; // 에러 아이콘
        case 'caution':
          return <IcoWarning width={48} height={48} stroke="#FF4646" />; // 경고 아이콘
        case 'complete':
          return <IcoAlertComplete width={48} height={48} stroke="#00AFD5" />; // 완료 아이콘
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
          onClick={() => handleClose(false)}>
          {cancelButtonLabel}
        </Button>
        <Button
          variant="primary"
          size="lg"
          className={styles.btn_confirm}
          onClick={() => handleClose(true)}>
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
      <div className={cn(styles.root, styles.alert_wrap, 'nlp--alert')}>
        {/* icon */}
        {iconVisible && <div className={styles.icon}>{iconCase()}</div>}

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
