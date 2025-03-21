import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import { usePageMetaState } from '../../../../entities/platform';

import { MobileContainerHeader } from './container/container-header';
import { MobileHeader } from './header/header';
import { MobileFooter } from './footer/footer';
import { Footer } from '../../ui/main/footer/footer';

import styles from './layout.module.css';

interface LayoutComponentProps {
  children: ReactNode;
}

function LayoutComponent({ children }: LayoutComponentProps) {
  const { t } = useTranslation();

  const [pageMeta] = usePageMetaState();

  useEffect(() => {
    console.log('useEffect pageMeta', pageMeta);
  }, [pageMeta]);
  return (
    <>
      {/* <MobileContainerHeader /> */}
      <MobileHeader />
      <main>{children}</main>
      <Footer /> {/* 하단 반응형 footer */}
      {pageMeta?.mobile?.showFooter && <MobileFooter />}
    </>
  );
}

export const MobileLayout = LayoutComponent;
