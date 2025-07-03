import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
import { useCurrentRoute } from '@learnway/hooks';

import { MobileHeader } from './header/header';
import { MobileFooter } from './footer/footer';
import { Footer } from '../../ui/main/footer/footer';
import { MobileContainerHeader } from './container/container-header';

import styles from '@learnway/styles/fo/widgets/layout/m.ui/main/layout.module.css';
import { SearchOverlay } from '../../../../features/layout/m.ui/search/search-panel';

interface LayoutComponentProps {
  children: ReactNode;
}

function LayoutComponent({ children }: LayoutComponentProps) {
  const { t } = useTranslation();

  const { meta } = useCurrentRoute();

  return (
    <div className={styles.start}>
      {meta?.mobile?.showHeader ? <MobileHeader /> : <MobileContainerHeader />}
      <main>{children}</main>
      {meta?.mobile?.showMainFooter && <Footer />}
      {meta?.mobile?.showFooter && <MobileFooter />}
      <SearchOverlay />
    </div>
  );
}

export const MobileLayout = LayoutComponent;
