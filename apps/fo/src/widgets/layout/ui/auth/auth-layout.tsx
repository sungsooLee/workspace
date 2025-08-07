import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { useCurrentRoute } from '@learnway/hooks';

import { AuthContainer } from './auth-container/auth-container';
import { LoginContainer } from './auth-container/login-container';
import { AuthHeader } from './auth-header/auth-header';

import styles from '@learnway/styles/fo/widgets/layout/ui/auth/auth-layout.module.css';
import { MobileAuthContainerHeader } from '@widgets/layout/m.ui/auth/auth-container/auth-container-header';
import { BrowserView, MobileView } from 'react-device-detect';

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
      {/* {isMobile ? meta.mobile.showHeader && <AuthHeader /> : <AuthHeader />} */}
      <BrowserView>
        <AuthHeader />
      </BrowserView>
      <MobileView>
        {meta?.container === AUTH_CONTAINERS.LOGIN ? <AuthHeader /> : <MobileAuthContainerHeader />}
      </MobileView>
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

/**
 * @description FO 로그인 화면 레이아웃 ( 비밀번호찾기, 비밀번호 변경, 테넌트 선택...)
 */
export const AuthLayout = memo(AuthLayoutComponent);
