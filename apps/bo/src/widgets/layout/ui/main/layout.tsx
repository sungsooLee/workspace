import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import { useActiveMenuDepthState, useFetchAuthUser } from '@learnway/auth/entities';
import { LNB } from './lnb/lnb';

import { Header } from './header/header';

import styles from './layout.module.css';
import { useWindowSize } from 'react-use';
import { MinWidthRequired } from '../../../../shared/ui/min-width-required/min-width-required';

interface LayoutComponentProps {
  children: ReactNode;
}

function LayoutComponent({ children }: LayoutComponentProps) {
  const { t } = useTranslation();

  const { data } = useFetchAuthUser();
  const { activeMenuDepthMenu } = useActiveMenuDepthState((state) => state);
  // const { width } = useWindowSize();

  // if (width < 1000) {
  //   return <MinWidthRequired />;
  // }

  if (
    activeMenuDepthMenu &&
    activeMenuDepthMenu?.length &&
    activeMenuDepthMenu[0].children &&
    activeMenuDepthMenu[0].children?.length > 0
  ) {
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

  return (
    <>
      <Header />
      <div className={cn(styles.start, styles.container)}>
        <div className={cn(styles.container_inner, 'container_inner')}>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}

export const Layout = LayoutComponent;
