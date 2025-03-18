import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import styles from '@learnway/styles/fo/shared/ui/highlight-message-box/highlight-message-box.module.css';

interface HighlightMessageBoxComponentProps {
  className?: string;
  children: ReactNode[] | ReactNode;
}

function HighlightMessageBoxComponent({ children, className }: HighlightMessageBoxComponentProps) {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.start, className)}>
      <div>{children}</div>
    </div>
  );
}

export const HighlightMessageBox = HighlightMessageBoxComponent;
