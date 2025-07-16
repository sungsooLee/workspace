import { memo } from 'react';
import { isMobile } from 'react-device-detect';
import { useLocation } from '@tanstack/react-router';

import { cn } from '@learnway/shared';

import { Logo, Language } from '../../../../../features/layout';
// import { Language } from '../../../../../features/platform';
import { isSigninPage } from '../../../../../features/platform';

//import styles from './auth-header.module.css';
import styles from '@learnway/styles/fo/widgets/layout/ui/auth/auth-header/auth-header.module.css';

function AuthHeaderComponent() {
  const location = useLocation();

  return (
    <div className={`${styles.start} ${styles.auth_header}`}>
      <header className={styles.header_area}>
        <div className={styles.top_area}>
          <div className={styles.logo_inner}>
            <h1>
              <Logo />
            </h1>
          </div>

          <div className={styles.util}>
            <Language className={styles.auth} />
          </div>
        </div>
      </header>
    </div>
  );
}

export const AuthHeader = memo(AuthHeaderComponent);
