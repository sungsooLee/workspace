import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { MobileView, BrowserView, isMobile } from 'react-device-detect';

import { cn } from '@learnway/shared';

import { useCurrentRoute } from '@learnway/config';

import { AuthHeader } from './auth-header/auth-header';
import { AuthContainer } from './auth-container/auth-container';

import styles from './auth-layout.module.css';

interface AuthLayoutComponentProps {
  children: ReactNode;
}

function AuthLayoutComponent({ children }: AuthLayoutComponentProps) {
  const { t } = useTranslation();

  const { meta } = useCurrentRoute();
  console.log('AuthLayoutComponent', meta, meta.mobile.showHeader);
  return (
    <>
      {isMobile ? meta.mobile.showHeader && <AuthHeader /> : <AuthHeader />}
      <div className={`${styles.start} ${styles.container}`}>
        <div className={styles.inner}>
          <main>
            <AuthContainer>{children}</AuthContainer>
          </main>
        </div>
      </div>
    </>
  );
}

export const AuthLayout = memo(AuthLayoutComponent);
