import { ReactNode, useEffect } from 'react';
import {
  useLocation,
  useMatches,
  RouteMatch,
  useRouter,
  useRouterState,
} from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { last } from 'lodash';

import { isSigninPage, useCurrentRoute } from '../../../../../features/platform';
import { AuthFooter } from './auth-footer/auth-footer';

import styles from './auth-container.module.css';

interface AuthContainerComponentProps {
  children: ReactNode;
}

function AuthContainerComponent({ children }: AuthContainerComponentProps) {
  const { t } = useTranslation();

  const { meta } = useCurrentRoute(); //{ meta: { title: '!' } }; //

  const location = useLocation();

  return (
    <div
      className={`${styles.start} ${styles.auth_container} ${isSigninPage(location.pathname) ? styles.login : ''}`}>
      <div className={styles.auth_area}>
        <h2 className={isSigninPage(location.pathname) ? styles.title_login : ''}>
          {t(meta?.title ?? '')}
        </h2>
        <div
          className={`${styles.auth_inner} ${isSigninPage(location.pathname) ? styles.login : ''}`}>
          {children}
        </div>
        <AuthFooter />
      </div>
    </div>
  );
}

export const AuthContainer = AuthContainerComponent;
