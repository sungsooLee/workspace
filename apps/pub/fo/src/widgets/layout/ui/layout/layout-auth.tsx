import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

// import { cn } from '@learnway/shared';
import { AuthContainer } from '../container/auth-container';
import styles from './layout-auth.module.css';
interface LayoutAuthComponentProps {
  children: ReactNode;
}

function LayoutAuthComponent({ children }: LayoutAuthComponentProps) {
  const { t } = useTranslation();

  return (
    <div className={`${styles.start} ${styles.container}`}>
      <div className={styles.inner}>
        <main>
          <AuthContainer>{children}</AuthContainer>
        </main>
      </div>
    </div>
  );
}

export const LayoutAuth = memo(LayoutAuthComponent);
