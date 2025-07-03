import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import { MobileContainerHeader } from './container/container-header';
import { MobileHeader } from './header/header';
import { MobileFooter } from './footer/footer';
import { Footer } from '../../ui/main/footer/footer';

//import styles from './layout.module.css';
import styles from '@learnway/styles/fo/widgets/layout/m.ui/main/layout.module.css';

interface LayoutComponentProps {
  children: ReactNode;
}

function LayoutComponent({ children }: LayoutComponentProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.start}>
      <MobileHeader />
      {/* <MobileHeader /> */}
      {/* <MobileContainerHeader /> */}
      <main>{children}</main>
      {/* 하단 반응형 footer */}
      {/* <Footer />  */}
      {/* {pageMeta?.mobile?.showFooter && <MobileFooter />} */}
      {/* <MobileFooter /> */}
    </div>
  );
}

export const MobileLayout = LayoutComponent;
