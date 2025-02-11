import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useActiveMenuDepthState } from '../../../../features/layout';

import { PageContainer } from '../container/page-container';
import styles from './layout.module.css';
import { Breadcrumbs } from '../container/breadcrumbs/breadcrumbs';

interface LayoutComponentProps {
  children: ReactNode;
}

function LayoutComponent({ children }: LayoutComponentProps) {
  const { t } = useTranslation();

  const [activeMenuDepth] = useActiveMenuDepthState();

  return (
    <div className={`${styles.start} ${styles.container}`}>
      {/* <div className={styles.breadcrums}>
        <div className={styles.inner}>
          <Breadcrumbs />
        </div>
      </div> */}
      <div className={styles.inner}>
        <main>
          <PageContainer>{children}</PageContainer>
        </main>
      </div>
    </div>
  );
}

export const Layout = memo(LayoutComponent);
