import { ReactNode } from 'react';
import { useLocation } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useCurrentRoute } from '@learnway/hooks';

import { isSigninPage } from '../../../../../features/platform';

import styles from '@learnway/styles/bo/widgets/layout/ui/auth/auth-container/auth-container.module.css';

interface AuthContainerComponentProps {
  children: ReactNode;
}

function AuthContainerComponent({ children }: AuthContainerComponentProps) {
  const { t } = useTranslation();

  const location = useLocation();

  const { meta } = useCurrentRoute();

  return (
    <div
      className={`${styles.start} ${styles.auth_container} ${isSigninPage(location.pathname) ? styles.login : ''}`}
    >
      <div className={styles.auth_area}>
        <h2 className={isSigninPage(location.pathname) ? styles.title_login : ''}>
          {t(meta?.title)}
        </h2>
        <div
          className={`${styles.auth_inner} ${isSigninPage(location.pathname) ? styles.login : ''}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export const AuthContainer = AuthContainerComponent;
