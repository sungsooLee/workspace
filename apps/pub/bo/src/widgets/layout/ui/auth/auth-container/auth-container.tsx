import { ReactNode } from 'react';
import { useLocation } from '@tanstack/react-router';

import { PAGE_TITLE_BY_PATH, isSigninPage } from '../../../../../features/platform';
// import { AuthFooter } from './auth-footer/auth-footer';

import styles from './auth-container.module.css';

interface AuthContainerComponentProps {
  children: ReactNode;
}

function AuthContainerComponent({ children }: AuthContainerComponentProps) {
  const location = useLocation();
  const pageTitle = PAGE_TITLE_BY_PATH[location.pathname];

  return (
    <div
      className={`${styles.start} ${styles.auth_container} ${isSigninPage(location.pathname) ? styles.login : ''}`}>
      <div className={styles.auth_area}>
        <h2 className={isSigninPage(location.pathname) ? styles.title_login : ''}>{pageTitle}</h2>
        <div
          className={`${styles.auth_inner} ${isSigninPage(location.pathname) ? styles.login : ''}`}>
          {children}
        </div>
        {/* <AuthFooter /> */}
      </div>
    </div>
  );
}

export const AuthContainer = AuthContainerComponent;
