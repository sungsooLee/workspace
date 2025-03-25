import { memo } from 'react';

import { Logo } from '../../../../../features/layout';
import { Language } from '../../../../../features/platform';


import styles from './auth-header.module.css';

function AuthHeaderComponent() {
  return (
    <div className={`${styles.start} ${styles.auth_header}`}>
      <header className={styles.header_area}>
        <h1>
          <Logo />
        </h1>
        <Language className={styles.auth} />
      </header>
    </div>
  );
}

export const AuthHeader = memo(AuthHeaderComponent);
