import { cn } from '@learnway/shared';
import React from 'react';
import styles from './empty-text.module.css';
import { IcoCaution } from '@learnway/icons';
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';

export interface EmptyTextComponentProps {
  type?: 'empty' | 'info' | 'error';
  className?: string;
  size?: 'md' | 'lg';
  text?: string;
  description?: string;
  footer?: React.ReactNode;
  hideTitle?: boolean;
  // onOptionSelect?: (option: any) => void;
}

const EmptyTextComponent = function ({
  className,
  type = 'empty',
  text,
  description,
  footer,
  hideTitle,
  size,
}: EmptyTextComponentProps) {
  const { t } = useTranslation();
  return (
    <div
      className={cn(
        styles.start,
        styles.empty_wrap,
        type && styles[type],
        className,
        'nlp--empty-text',
      )}
    >
      {/* icon  */}
      {!isMobile && (
        <IcoCaution width={48} height={48} stroke={'#A9AFB8'} className={styles.icon} />
      )}
      {/* text */}
      {!hideTitle && <strong className={styles.title}>{text || t('Default Text')}</strong>}
      {/* description */}
      <p className={styles.text}>{description}</p>
      {/* footer */}
      <div className={styles.footer}>{footer}</div>
    </div>
  );
};

export const EmptyText = EmptyTextComponent;
