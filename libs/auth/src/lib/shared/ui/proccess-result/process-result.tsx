import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { IcoComplete, IcoCaution02 } from '@learnway/icons';
import { cn } from '@learnway/shared';

import { HighlightMessageBox } from '../highlight-message-box/highlight-message-box';

import styles from '@learnway/styles/fo/widgets/auth/ui/proccess-result.module.css';

interface ProccessResultComponentProps {
  isSuccess?: boolean;
  title: string;
  className?: string;
  children?: ReactNode[] | ReactNode;
}

function ProccessResultComponent({
  isSuccess,
  children,
  className,
  title,
}: ProccessResultComponentProps) {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.start, className)}>
      <i className={styles.ico}>
        {isSuccess ? (
          <IcoComplete className={styles.ico1} />
        ) : (
          <IcoCaution02 className={styles.ico2} />
        )}
      </i>
      <h3 className={styles.title}>{title}</h3>
      {children && (
        <HighlightMessageBox className={styles.noti_box}>{children}</HighlightMessageBox>
      )}
    </div>
  );
}

export const ProccessResult = ProccessResultComponent;
