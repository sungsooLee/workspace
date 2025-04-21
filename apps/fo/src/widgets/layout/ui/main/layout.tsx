import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useMatches } from '@tanstack/react-router';

import { cn } from '@learnway/shared';
import { useCurrentRoute } from '@learnway/hooks';

import { Breadcrumbs } from '../container/breadcrumbs/breadcrumbs';
import { useShowBreadcrumbs } from '../../service/breadcurmb.hooks';

import { PageContainer } from './container/page-container';
import { MyPageContainer } from './container/my-page-container';
import { Header } from './header/header';
import { Footer } from './footer/footer';

import styles from '@learnway/styles/fo/widgets/layout/ui/main/layout.module.css';

export const MAIN_CONTAINERS = {
  MY_PAGE: 'my-page-container',
};

interface LayoutComponentProps {
  children: ReactNode;
}

function LayoutComponent({ children }: LayoutComponentProps) {
  const { t } = useTranslation();

  const { meta } = useCurrentRoute();

  const shouldShowBreadcrumbs = useShowBreadcrumbs();

  const matches = useMatches();

  const categoryMatch = matches.find((match) => match.routeId.includes('/category'));

  const categoryId = categoryMatch?.context?.categoryId;

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
            {meta?.container === MAIN_CONTAINERS.MY_PAGE && (
              <MyPageContainer>{children}</MyPageContainer>
            )}
            {!meta?.container && <PageContainer>{children}</PageContainer>}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export const Layout = LayoutComponent;
