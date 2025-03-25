import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
//import { useCurrentRoute } from '../../../../features/platform';
import { AuthHeader } from './auth-header/auth-header';
import { AuthContainer } from './auth-container/auth-container';
import styles from './auth-layout.module.css';

interface AuthLayoutComponentProps {
  children: ReactNode;
}

function AuthLayoutComponent({ children }: AuthLayoutComponentProps) {
  const { t } = useTranslation();
  //const { meta } = useCurrentRoute();

  return (
    <>
      {/* {meta.mobile.showHeader && <AuthHeader />} */}
      {/* <AuthHeader /> */}

      <div className={`${styles.start} ${styles.container}`}>
        <div className={styles.inner}>
          <main>
            <AuthContainer>{children}</AuthContainer>
          </main>
        </div>
      </div>
    </>
  );
}

export const AuthLayout = memo(AuthLayoutComponent);
