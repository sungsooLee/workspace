import { memo, ReactNode } from 'react';
// import { useTranslation } from 'react-i18next';
import { Breadcrumbs } from './breadcrumbs/breadcrumbs';
import styles from './page-container.module.css';

interface PageContainerComponentProps {
  children: ReactNode;
}

function PageContainerComponent({ children }: PageContainerComponentProps) {
  // const { t } = useTranslation();

  return (
    <div className={`${styles.start} ${styles.contents}`}>
      <Breadcrumbs />
      <div className={styles.inner}>{children}</div>
    </div>
  );
}

export const PageContainer = memo(PageContainerComponent);
