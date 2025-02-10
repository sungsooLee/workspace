import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useActiveMenuDepthState } from '../../../../features/layout';

import { PageContainer } from '../container/page-container';
import styles from './layout.module.css';
import { Breadcrumbs } from '../container/breadcrumbs/breadcrumbs';
import { useShowBreadcrumbs } from '../../service/breadcurmb.hooks';
import { useParams, useRouter } from '@tanstack/react-router';

interface LayoutComponentProps {
  children: ReactNode;
}

function LayoutComponent({ children }: LayoutComponentProps) {
  const { t } = useTranslation();

  const [activeMenuDepth] = useActiveMenuDepthState();

  const shouldShowBreadcrumbs = useShowBreadcrumbs();
  // const { categoryId } = useParams({ from: '/_layout/category/$categoryId' });
  const router = useRouter();
  const { categoryId } = useParams({ strict: false });

  const currentCategoryId = categoryId ? Number(categoryId) : null;

  return (
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
  );
}

export const Layout = memo(LayoutComponent);
