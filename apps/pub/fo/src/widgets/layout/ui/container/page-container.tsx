import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './page-container.module.css';

interface PageContainerComponentProps {
  children: ReactNode;
}

function PageContainerComponent({ children }: PageContainerComponentProps) {
  const { t } = useTranslation();

  return (
    <div className={`${styles.start} ${styles.page_container}`}>
      <div className={styles.title}>{'title'}</div>
      <div>{children}</div>
    </div>
  );
}

export const PageContainer = memo(PageContainerComponent);
