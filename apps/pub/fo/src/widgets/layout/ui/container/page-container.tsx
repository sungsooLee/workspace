import { memo, ReactNode, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './page-container.module.css';

interface PageContainerComponentProps {
  children: ReactNode;
}

function PageContainerComponent({ children }: PageContainerComponentProps) {
  const { t } = useTranslation();

  // 퍼블 확인용
  const [inCategoryPage, setIsCategoryPage] = useState(false);
  useEffect(() => {
    setIsCategoryPage(window.location.pathname.includes('/category/'));
  }, []);

  return (
    <div className={`${styles.start} ${styles.page_container}`}>
      {inCategoryPage && <div className={styles.title}>{'title'}</div>}
      {children}
    </div>
  );
}

export const PageContainer = memo(PageContainerComponent);
