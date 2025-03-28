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

  console.log('children', children);
  return (
    <div
      className={cn(styles.start, className)}
      dangerouslySetInnerHTML={{ __html: children ?? <span></span> }}></div>
  );
};

export const HtmlContent = HtmlContentComponent;
