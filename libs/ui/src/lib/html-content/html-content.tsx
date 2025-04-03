import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import styles from './html-content.module.css';

export interface HtmlContentComponentProps {
  className?: string;
  children?: ReactNode;
}

const HtmlContentComponent = function ({ children, className }: HtmlContentComponentProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(styles.start, className)}
      dangerouslySetInnerHTML={{ __html: children ?? `` }}></div>
  );
};

export const HtmlContent = HtmlContentComponent;
