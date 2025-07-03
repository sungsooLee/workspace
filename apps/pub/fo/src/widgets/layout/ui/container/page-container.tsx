import { memo, ReactNode, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '@learnway/styles/fo/widgets/layout/ui/main/container/page-container.module.css';

interface PageContainerComponentProps {
  children: ReactNode;
}

function PageContainerComponent({ children }: PageContainerComponentProps) {
  const { t } = useTranslation();

  // 퍼블 확인용
  const [inCategoryPage, setIsCategoryPage] = useState(false);
  const [inEduSupportPage, setEduSupportPage] = useState(false);
  useEffect(() => {
    setIsCategoryPage(window.location.pathname.includes('/category/'));
    setEduSupportPage(window.location.pathname.includes('/edu-support/'));
  }, []);

  return (
    <div className={`${styles.start} ${styles.page_container}`}>
      {(inCategoryPage || inEduSupportPage) && (
        <div className={styles.title}>{'타이틀(개발분기)'}</div>
      )}
      {children}
    </div>
  );
}

export const PageContainer = memo(PageContainerComponent);
