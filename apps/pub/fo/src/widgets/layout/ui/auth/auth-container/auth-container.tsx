import { ReactNode } from 'react';
import { useLocation } from '@tanstack/react-router';

import { PAGE_TITLE_BY_PATH, isSigninPage } from '../../../../../features/platform';

import { AuthFooter } from './auth-footer/auth-footer';
import { Footer } from '../../../../../widgets/layout/ui/main/footer/footer';
import { MobileView, BrowserView } from 'react-device-detect';
import { MobileContainerFooter } from '../../../../../shared/m.ui/container-footer/container-footer';

//import styles from './auth-container.module.css';
import styles from '@learnway/styles/fo/widgets/layout/ui/auth/auth-container/auth-container.module.css';

interface AuthContainerComponentProps {
  children: ReactNode;
}

function AuthContainerComponent({ children }: AuthContainerComponentProps) {
  const location = useLocation();

  return (
    <div
      className={`${styles.start} ${styles.auth_container} ${isSigninPage(location.pathname) ? styles.login : ''}`}
    >
      <div className={`${styles.auth_area}`}>
        <div
          className={`${styles.auth_inner} ${isSigninPage(location.pathname) ? styles.login : ''}`}
        >
          {children}
        </div>
      </div>
      <BrowserView>
        <AuthFooter />
      </BrowserView>
      <MobileView>{isSigninPage(location.pathname) && <AuthFooter />}</MobileView>
    </div>
  );
}

export const AuthContainer = AuthContainerComponent;
