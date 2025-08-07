import { memo } from 'react';

import { AuthLanguage, Logo } from '@features/layout';

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
            <AuthLanguage className={styles.auth} />
          </div>
        </div>
      </header>
    </div>
  );
}

export const AuthHeader = memo(AuthHeaderComponent);
