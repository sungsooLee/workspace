import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import { usePageMetaState } from '../../../../entities/platform';

import { MobileHeader } from './header/header';
import { MobileFooter } from './footer/footer';

import { isSigninPage, useCurrentRoute } from '../../../../features/platform';

import styles from './auth-layout.module.css';

interface LayoutComponentProps {
  children: ReactNode;
}

function LayoutComponent({ children }: LayoutComponentProps) {
  const { t } = useTranslation();

  const { meta } = useCurrentRoute();

  return (
    <>
      <MobileHeader />
      <main>{children}</main>
      {meta?.mobile?.showFooter && <MobileFooter />}
    </>
  );
}

export const MobileAuthLayout = LayoutComponent;
