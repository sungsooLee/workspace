import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import { useActiveMenuDepthState } from '../../../../features/platform';
import { LNB } from './lnb/lnb';

import { Header } from './header/header';
import styles from './layout.module.css';

interface LayoutComponentProps {
  children: ReactNode;
}

function LayoutComponent({ children }: LayoutComponentProps) {
  const { t } = useTranslation();

  const [activeMenuDepth] = useActiveMenuDepthState();

  // if (
  //   activeMenuDepth &&
  //   activeMenuDepth?.length &&
  //   activeMenuDepth[0].children &&
  //   activeMenuDepth[0].children?.length > 0
  // ) {
  //   return (
  //     <>
  //       <Header />
  //       <div className={cn(styles.start, styles.container)}>
  //         <div className={cn(styles.container_inner, 'container_inner')}>
  //           <LNB />
  //           <main>{children}</main>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

  return (
    <>
      <Header />
      <div className={cn(styles.start, styles.container)}>
        <div className={cn(styles.container_inner, 'container_inner')}>
          <LNB />
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}

export const Layout = LayoutComponent;
