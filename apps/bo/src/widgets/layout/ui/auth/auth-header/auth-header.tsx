import { memo } from 'react';
import { useLocation } from '@tanstack/react-router';

import { cn } from '@learnway/shared';

import { Logo } from '../../../../../features/layout';
import { Language } from '../../../../../features/platform';
import { isSigninPage } from '../../../../../features/platform';

import styles from '@learnway/styles/bo/widgets/layout/ui/auth/auth-header/auth-header.module.css';

function AuthHeaderComponent() {
  const location = useLocation();

  return (
    <div className={`${styles.start} ${styles.header_auth}`}>
      <header className={styles.header_area}>
        <h1>
          <Logo theme={isSigninPage(location.pathname) ? 'login' : 'main'} />
        </h1>
        <Language className="auth_language" />
      </header>
    </div>
  );
}

export const AuthHeader = memo(AuthHeaderComponent);
