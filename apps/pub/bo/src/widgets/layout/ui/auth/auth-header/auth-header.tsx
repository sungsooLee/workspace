import { memo } from 'react';
import { useLocation } from '@tanstack/react-router';

import { cn } from '@learnway/shared';

import { Logo } from '../../../../../features/layout/ui/logo';
import { Language } from '../../../../../features/layout/ui/language';
import { isSigninPage } from '../../../../../features/platform';

import styles from './auth-header.module.css';

function AuthHeaderComponent() {
  const location = useLocation();

  return (
    <div className={`${styles.start} ${styles.header_auth}`}>
      <header className={styles.header_area}>
        <h1>
          <Logo headerType="login" />
        </h1>

        <Language className={styles.auth} />
      </header>
    </div>
  );
}

export const AuthHeader = memo(AuthHeaderComponent);
