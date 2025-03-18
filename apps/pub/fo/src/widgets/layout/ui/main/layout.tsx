import { memo, ReactNode, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// import { cn } from '@learnway/shared';
import { Header } from './header/header';
import { Footer } from './footer/footer';

import { Breadcrumbs } from '../container/breadcrumbs/breadcrumbs';
import { RelatedSearch } from '../container/related-search/related-search';

import { PageContainer } from '../container/page-container';
import styles from './layout.module.css';
interface LayoutComponentProps {
  children: ReactNode;
}

function LayoutComponent({ children }: LayoutComponentProps) {
  const { t } = useTranslation();

  // 퍼블 확인용
  const [inCategoryPage, setIsCategoryPage] = useState(false);
  const [inIntegratedSearch, setInIntegratedSearch] = useState(false);
  useEffect(() => {
    setIsCategoryPage(window.location.pathname.includes('/category/'));
    setInIntegratedSearch(window.location.pathname.includes('/integrated-search/'));
  }, []);

  return (
    <>
      <Header />
      <div className={`${styles.start} ${styles.container}`}>
        {/* 연관 검색어 */}
        {inIntegratedSearch && (
          <div className={styles.related}>
            <div className={styles.inner}>
              <RelatedSearch />
            </div>
          </div>
        )}

        {/* navigation depth */}
        {inCategoryPage && (
          <div className={styles.breadcrums}>
            <div className={styles.inner}>
              <Breadcrumbs />
            </div>
          </div>
        )}

        <div className={styles.inner}>
          <main>
            <PageContainer>{children}</PageContainer>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export const Layout = memo(LayoutComponent);
