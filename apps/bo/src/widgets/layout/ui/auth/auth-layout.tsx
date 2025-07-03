import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreation } from 'ahooks';

import { cn } from '@learnway/shared';
import { useCurrentRoute } from '@learnway/hooks';

import { AuthHeader } from './auth-header/auth-header';
import { AuthContainer } from './auth-container/auth-container';
import { LoginContainer } from './auth-container/login-container';

import styles from '@learnway/styles/bo/widgets/layout/ui/auth/auth-layout.module.css';
import { useWindowSize } from 'react-use';
import { MinWidthRequired } from '../min-width-required';

export const AUTH_CONTAINERS = {
  LOGIN: 'login-container',
  AUTH_PROGRESS: 'AUTH_PROGRESS',
};

interface AuthLayoutComponentProps {
  children: ReactNode;
}

function AuthLayoutComponent({ children }: AuthLayoutComponentProps) {
  const { t } = useTranslation();

  const { meta } = useCurrentRoute();
  return (
    <>
      <AuthHeader />
      <div className={`${styles.start} ${styles.container}`}>
        <div className={styles.inner}>
          <main>
            {meta?.container === AUTH_CONTAINERS.LOGIN && (
              <LoginContainer>{children}</LoginContainer>
            )}
            {meta?.container === AUTH_CONTAINERS.AUTH_PROGRESS && (
              <AuthContainer>{children}</AuthContainer>
            )}
            {!meta?.container && <AuthContainer>{children}</AuthContainer>}
          </main>
        </div>
      </div>
    </>
  );
}

export const AuthLayout = memo(AuthLayoutComponent);
