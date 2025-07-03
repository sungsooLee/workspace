import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { MobileView, BrowserView, isMobile } from 'react-device-detect';

import { cn } from '@learnway/shared';
import { useCurrentRoute } from '@learnway/hooks';

import { AuthHeader } from './auth-header/auth-header';
import { AuthContainer } from './auth-container/auth-container';
import { LoginContainer } from './auth-container/login-container';

import styles from '@learnway/styles/fo/widgets/layout/ui/auth/auth-layout.module.css';

export const AUTH_CONTAINERS = {
  LOGIN: 'login-container',
};

interface AuthLayoutComponentProps {
  children: ReactNode;
}

function AuthLayoutComponent({ children }: AuthLayoutComponentProps) {
  const { t } = useTranslation();

  const { meta } = useCurrentRoute();

  return (
    <>
      {/**모바일인 경우 로그인 페이지만 Header를 render하고 나머지 페이지는 containerHeader를 사용 */}
      {isMobile ? meta.mobile.showHeader && <AuthHeader /> : <AuthHeader />}
      <div className={`${styles.start} ${styles.container}`}>
        <div className={styles.inner}>
          <main>
            {meta?.container === AUTH_CONTAINERS.LOGIN && (
              <LoginContainer>{children}</LoginContainer>
            )}
            {!meta?.container && <AuthContainer>{children}</AuthContainer>}
          </main>
        </div>
      </div>
    </>
  );
}

export const AuthLayout = memo(AuthLayoutComponent);
