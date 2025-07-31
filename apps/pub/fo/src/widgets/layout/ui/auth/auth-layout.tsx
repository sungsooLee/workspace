import { useLocation } from '@tanstack/react-router';
import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import styles from '@learnway/styles/fo/widgets/layout/ui/auth/auth-layout.module.css';
import { AuthContainer } from './auth-container/auth-container';
import { AuthHeader } from './auth-header/auth-header';

import { BrowserView, MobileView } from 'react-device-detect';
import { isSigninPageInfo, PAGE_TITLE_BY_PATH } from '../../../../features/platform';

interface AuthLayoutComponentProps {
  children: ReactNode;
}

function AuthLayoutComponent({ children }: AuthLayoutComponentProps) {
  const { t } = useTranslation();

  const location = useLocation();
  const pageTitle = PAGE_TITLE_BY_PATH[location.pathname];

  return (
    <>
      {/* {meta.mobile.showHeader && <AuthHeader />} */}
      {/* 퍼블확인용 */}
      <BrowserView>
        <AuthHeader />
      </BrowserView>
      <MobileView>{isSigninPageInfo(location.pathname) ? <AuthHeader /> : ''}</MobileView>

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
