import { ReactNode, useEffect } from 'react';
import { useLocation } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { MobileView, BrowserView } from 'react-device-detect';

import { isSigninPage, useCurrentRoute } from '../../../../../features/platform';
import { AuthFooter } from './auth-footer/auth-footer';
import { MobileAuthContainerHeader } from '../../../m.ui/auth/container/container-header';

//import styles from './auth-container.module.css';
import styles from '@learnway/styles/fo/widgets/layout/ui/auth/auth-container/auth-container.module.css';

interface AuthContainerComponentProps {
  children: ReactNode;
}

function AuthContainerComponent({ children }: AuthContainerComponentProps) {
  const { t } = useTranslation();

  const { meta } = useCurrentRoute();

  const location = useLocation();

  return (
    <div
      className={`${styles.start} ${styles.auth_container} ${isSigninPage(location.pathname) ? styles.login : ''}`}>
      <div className={`${styles.auth_area} ${isSigninPage(location.pathname) ? styles.none : ''}`}>
        <BrowserView>
          <h2 className={isSigninPage(location.pathname) ? styles.title_login : ''}>
            {t(meta?.title ?? '')}
          </h2>
        </BrowserView>
        <MobileView>
          {isSigninPage(location.pathname) ? (
            <h2 className={styles.title_login}>{t(meta?.title ?? '')}</h2>
          ) : (
            <MobileAuthContainerHeader />
          )}
        </MobileView>

        <div
          className={`${styles.auth_inner} ${isSigninPage(location.pathname) ? styles.login : ''}`}>
          {children}
        </div>
        <BrowserView>
          <AuthFooter />
        </BrowserView>
        <MobileView>{isSigninPage(location.pathname) && <AuthFooter />}</MobileView>
      </div>
    </div>
  );
}

export const AuthContainer = AuthContainerComponent;
