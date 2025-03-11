import { cn } from '@learnway/shared';
import React from 'react';
import styles from './empty-text.module.css';
import { IcoSearch } from '@learnway/icons';
import { useTranslation } from 'react-i18next';

export interface EmptyTextComponentProps {
  type?: 'empty' | 'info' | 'error';
  className?: string;
  size?: 'md' | 'lg';
  text?: string;
  description?: string;
  footer?: React.ReactNode;
  // onOptionSelect?: (option: any) => void;
}

const EmptyTextComponent = function ({
  className,
  type = 'empty',
  text,
  description,
  footer,
}: EmptyTextComponentProps) {
  const { t } = useTranslation();
  return (
    <div className={cn(styles.start, className, 'nlp--empty-text', 'flex flex-col')}>
      {/* icon  */}
      <IcoSearch width={20} height={20} stroke={'#131C30'} />
      {/* text */}
      <p>{text || t('Default Text')}</p>
      {/* description */}
      <p>{description}</p>
      {/* footer */}
      {footer}
    </div>
  );
};

export const EmptyText = EmptyTextComponent;
