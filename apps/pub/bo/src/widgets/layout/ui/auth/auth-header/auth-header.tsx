import { memo } from 'react';
import { useLocation } from '@tanstack/react-router';

import { cn } from '@learnway/shared';

import { Logo } from '../../../../../features/layout';
import { Language } from '../../../../../features/platform';
import { isSigninPage } from '../../../../../features/platform';

import styles from './auth-header.module.css';

function AuthHeaderComponent() {
  const location = useLocation();

  return (
    <div className={`${styles.start} ${styles.auth_header}`}>
      <header className={styles.header_area}>
        <h1>
          <Logo />
        </h1>

        <Language />
      </header>
    </div>
  );
}

export const AuthHeader = memo(AuthHeaderComponent);
