import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
import { SidebarProvider, SidebarTrigger, Sidebar } from '@learnway/ui';

import { useActiveMenuDepthState } from '../../../../features/layout';
import { LNB } from '../lnb/lnb';
import { PageContainer } from '../container/page-container';

import styles from './layout.module.css';

interface LayoutComponentProps {
  children: ReactNode;
}

function LayoutComponent({ children }: LayoutComponentProps) {
  const { t } = useTranslation();

  const [activeMenuDepth] = useActiveMenuDepthState();

  if (activeMenuDepth && activeMenuDepth[0].children && activeMenuDepth[0].children?.length > 0) {
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
  }

  return <PageContainer>{children}</PageContainer>;
}

export const Layout = memo(LayoutComponent);
