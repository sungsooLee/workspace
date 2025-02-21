import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from '@tanstack/react-router';

import { cn } from '@learnway/shared';

import { Breadcrumbs } from '../container/breadcrumbs/breadcrumbs';
import { useShowBreadcrumbs } from '../../service/breadcurmb.hooks';

import { PageContainer } from '../container/page-container';
import { Header } from './header/header';
import { Footer } from './footer/footer';

import styles from './layout.module.css';

interface LayoutComponentProps {
  children: ReactNode;
}

function LayoutComponent({ children }: LayoutComponentProps) {
  const { t } = useTranslation();

  const shouldShowBreadcrumbs = useShowBreadcrumbs();
  const { categoryId } = useParams({ strict: false });

  const currentCategoryId = categoryId ? Number(categoryId) : null;

  return (
    <>
      <Header />
      <div className={`${styles.start} ${styles.container}`}>
        {shouldShowBreadcrumbs && (
          <div className={styles.breadcrums}>
            <div className={styles.inner}>
              <Breadcrumbs currentCategoryId={currentCategoryId} />
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

export const Layout = LayoutComponent;
