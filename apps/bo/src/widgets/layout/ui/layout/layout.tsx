import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
import { SidebarProvider, SidebarTrigger } from '@learnway/ui';

import { useActiveMenuState } from '../../../../features/layout';
import { LNB } from '../lnb/lnb';

interface LayoutComponentProps {
  children: ReactNode;
}

function LayoutComponent({ children }: LayoutComponentProps) {
  const { t } = useTranslation();

  const [active1TierMenu] = useActiveMenuState();

  if (!active1TierMenu || !active1TierMenu?.children?.length) {
    return <div className="bg-secondary-1 flex flex-col">{children}</div>;
  }

  return (
    <SidebarProvider>
      <LNB />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}

export const Layout = memo(LayoutComponent);
