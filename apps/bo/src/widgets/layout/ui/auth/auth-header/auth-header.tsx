import { memo } from 'react';

import { useCurrentRoute } from '@learnway/hooks';

import { Logo } from '../../../../../features/layout';
import { Language } from '../../../../../features/platform';

import { AUTH_CONTAINERS } from '../auth-layout';

import styles from '@learnway/styles/bo/widgets/layout/ui/auth/auth-header/auth-header.module.css';

function AuthHeaderComponent() {
  const { meta } = useCurrentRoute();
  return (
    <div className={`${styles.start} ${styles.header_auth}`}>
      <header className={styles.header_area}>
        <h1>
          <Logo
            theme={
              meta?.container === AUTH_CONTAINERS.LOGIN || AUTH_CONTAINERS.AUTH_PROGRESS
                ? 'login'
                : 'main'
            }
          />
        </h1>
        <Language className="auth_language" />
      </header>
    </div>
  );
}

export const AuthHeader = memo(AuthHeaderComponent);
