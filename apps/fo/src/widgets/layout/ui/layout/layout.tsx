import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useActiveMenuDepthState } from '../../../../features/layout';

import { SidebarProvider, Sidebar, SidebarTrigger } from '@learnway/ui';

import styles from './layout.module.css';
import { PageContainer } from '../container/page-container';

interface LayoutComponentProps {
  children: ReactNode;
}

function LayoutComponent({ children }: LayoutComponentProps) {
  const { t } = useTranslation();

  const [activeMenuDepth] = useActiveMenuDepthState();

  return <PageContainer>{children}</PageContainer>;
}

export const Layout = memo(LayoutComponent);
