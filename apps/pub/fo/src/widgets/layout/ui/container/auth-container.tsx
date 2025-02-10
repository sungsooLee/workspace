import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './auth-container.module.css';
import { FooterAuth } from '../footer/footer-auth';

interface AuthContainerComponentProps {
  children: ReactNode;
}

function AuthContainerComponent({ children }: AuthContainerComponentProps) {
  const { t } = useTranslation();

  return (
    <div className={`${styles.start} ${styles.auth_container}`}>
      <div className={styles.auth_area}>
        <h2 className={styles.login}>LEARNING WAY (시스템명)</h2>
        <div className={styles.auth_inner}>{children}</div>
        <FooterAuth />
      </div>
    </div>
  );
}

export const AuthContainer = memo(AuthContainerComponent);
