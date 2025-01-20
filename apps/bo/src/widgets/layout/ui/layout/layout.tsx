import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
import { SidebarProvider, SidebarTrigger, Sidebar, Radio } from '@learnway/ui';

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
      <SidebarProvider className={styles._start}>
        <Sidebar className={styles._sidebar}>
          <LNB />
        </Sidebar>
        <main>
          <SidebarTrigger />
          <Radio options={Array(5).fill(null).map((d, i) => ({value: `value${i}`, label: `label${i}`}))} />
        </main>
      </SidebarProvider>
    );
  }

  return <PageContainer>{children}</PageContainer>;
}

export const Layout = memo(LayoutComponent);
