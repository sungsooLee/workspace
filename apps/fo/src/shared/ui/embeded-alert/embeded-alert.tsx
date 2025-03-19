import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
import { IcoCaution } from '@learnway/icons';

import styles from '@learnway/styles/fo/shared/ui/embeded-alert/embeded-alert.module.css';

interface EmbededAlertComponentProps {
  className?: string;
  children: ReactNode[] | ReactNode;
}

function EmbededAlertComponent({ children, className }: EmbededAlertComponentProps) {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.start, className)}>
      <IcoCaution width={48} height={48} stroke={'#A9AFB8'} />
      <p className="txt">{children}</p>
    </div>
  );
}

export const EmbededAlert = EmbededAlertComponent;
