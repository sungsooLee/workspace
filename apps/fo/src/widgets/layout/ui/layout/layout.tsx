import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useActiveMenuDepthState } from '../../../../features/layout';

import { SidebarProvider, Sidebar, SidebarTrigger } from '@learnway/ui';

import styles from './layout.module.css';
import { LNB } from '../lnb/lnb';
import { PageContainer } from '../container/page-container';

interface LayoutComponentProps {
  children: ReactNode;
}

function LayoutComponent({ children }: LayoutComponentProps) {
  const { t } = useTranslation();

  const [activeMenuDepth] = useActiveMenuDepthState();

  if (activeMenuDepth && activeMenuDepth[0].children && activeMenuDepth[0].children?.length > 0) {
    return (
      <SidebarProvider className={styles._start}>
        <Sidebar className={styles._sidebar}>
          <LNB />
        </Sidebar>
        <main>
          <SidebarTrigger />
          <PageContainer>{children}</PageContainer>
        </main>
      </SidebarProvider>
    );
  }

  return <PageContainer>{children}</PageContainer>;
}

export const Layout = memo(LayoutComponent);
