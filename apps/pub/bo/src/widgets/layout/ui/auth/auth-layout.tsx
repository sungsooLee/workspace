import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import { AuthHeader } from './auth-header/auth-header';
import { AuthContainer } from './auth-container/auth-container';
//import styles from './auth-layout.module.css';
import styles from '@learnway/styles/bo/widgets/layout/ui/auth/auth-layout.module.css';

interface AuthLayoutComponentProps {
  children: ReactNode;
}

function AuthLayoutComponent({ children }: AuthLayoutComponentProps) {
  const { t } = useTranslation();

  return (
    <>
      <AuthHeader />
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
