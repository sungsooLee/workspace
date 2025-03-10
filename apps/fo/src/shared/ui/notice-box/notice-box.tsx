import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { IcoCaution } from '@learnway/icons';
import { cn } from '@learnway/shared';

import styles from '@learnway/styles/fo/shared/ui/notice-box/notice-box.module.css';

interface NoticeBoxComponentProps {
  title: string;
  className?: string;
  children: ReactNode[] | ReactNode;
}

function NoticeBoxComponent({ title, children, className }: NoticeBoxComponentProps) {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.start, className)}>
      <dl className={cn(styles.check_point, 'notice-box-check-point')}>
        {title && (
          <dt>
            <IcoCaution width={16} height={16} stroke="#6F798B" />
            {title}
          </dt>
        )}
        {children}
      </dl>
    </div>
  );
}

export const NoticeBox = NoticeBoxComponent;
