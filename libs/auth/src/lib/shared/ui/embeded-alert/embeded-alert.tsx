import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
import { IcoCaution } from '@learnway/icons';

import styles from '@learnway/styles/fo/pages/_auth/search-account/search-account.module.css';
import embededAlert from '@learnway/styles/fo/shared/ui/embeded-alert/embeded-alert.module.css';

interface EmbededAlertComponentProps {
  className?: string;
  children: ReactNode[] | ReactNode;
  hiddenIcon?: boolean;
}

function EmbededAlertComponent({
  children,
  className,
  hiddenIcon = false,
}: EmbededAlertComponentProps) {
  const { t } = useTranslation();

  return (
    <div className={cn(embededAlert.start, styles.search_info, styles.dormant, className)}>
      {!hiddenIcon && <IcoCaution width={48} height={48} stroke={'#A9AFB8'} />}
      <p className={embededAlert.txt}>{children}</p>
    </div>
  );
}

export const EmbededAlert = EmbededAlertComponent;
