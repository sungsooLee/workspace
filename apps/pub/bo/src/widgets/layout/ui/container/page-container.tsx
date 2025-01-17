import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreation } from 'ahooks';
import { last } from 'lodash';

import { cn } from '@learnway/shared';
import { SidebarProvider, SidebarTrigger, Sidebar } from '@learnway/ui';

import { useActiveMenuDepthState } from '../../../../features/layout';
import { LNB } from '../lnb/lnb';

import { Breadcrumbs } from './breadcrumbs/breadcrumbs';
import styles from './layout.module.css';

interface PageContainerComponentProps {
  children: ReactNode;
}

function PageContainerComponent({ children }: PageContainerComponentProps) {
  const { t } = useTranslation();

  const [activeMenuDepth] = useActiveMenuDepthState();

  const title = useCreation(() => {
    return last(activeMenuDepth)?.title;
  }, [activeMenuDepth]);

  return (
    <div className="bg-secondary-1 flex flex-col">
      <div>
        <Breadcrumbs />
      </div>
      <div>{title}</div>
      <div>{children}</div>
    </div>
  );
}

export const PageContainer = memo(PageContainerComponent);
