import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import { usePageMetaState } from '../../../../entities/platform';

import { MobileHeader } from './header/header';
import { MobileFooter } from './footer/footer';

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
      <MobileHeader />
      <main>
        <p>Mobile layout </p>
        {children}
      </main>
      {pageMeta?.mobile?.showFooter && <MobileFooter />}
    </>
  );
}

export const MobileLayout = LayoutComponent;
