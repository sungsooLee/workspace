import { ReactNode } from 'react';
import { useLocation } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useCurrentRoute } from '@learnway/hooks';

import styles from '@learnway/styles/bo/widgets/layout/ui/auth/auth-container/auth-container.module.css';

interface LoginContainerComponentProps {
  children: ReactNode;
}

function LoginContainerComponent({ children }: LoginContainerComponentProps) {
  const { t } = useTranslation();

  const { meta } = useCurrentRoute();

  return (
    <div className={`${styles.start} ${styles.auth_container} ${styles.login}`}>
      <div className={styles.auth_area}>
        <h2 className={styles.title_login}>{t(meta?.title)}</h2>
        <div className={`${styles.auth_inner} ${styles.login}`}>{children}</div>
      </div>
    </div>
  );
}

export const LoginContainer = LoginContainerComponent;
