import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

// import { cn } from '@learnway/shared';
// import { SidebarProvider, SidebarTrigger, Sidebar } from '@learnway/ui';

import { LNB } from '../lnb/lnb';
import { PageContainer } from '../container/page-container';

import styles from './layout.module.css';

interface LayoutComponentProps {
  children: ReactNode;
}

function LayoutComponent({ children }: LayoutComponentProps) {
  const { t } = useTranslation();

  //if () {
  return (
    <div className={styles.start}>
      <div className={styles.bo_container}>
        <LNB />
        <main>
          <PageContainer>{children}</PageContainer>
        </main>
      </div>
    </div>
  );
  //}

  //return <PageContainer>{children}</PageContainer>;
}

export const Layout = memo(LayoutComponent);
