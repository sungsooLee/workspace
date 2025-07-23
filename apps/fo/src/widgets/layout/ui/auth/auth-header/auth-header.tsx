import { memo } from 'react';

import { Logo } from '../../../../../features/layout';
import { Language } from '../../../../../features/platform';

import styles from '@learnway/styles/fo/widgets/layout/ui/auth/auth-header/auth-header.module.css';

function AuthHeaderComponent() {
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
