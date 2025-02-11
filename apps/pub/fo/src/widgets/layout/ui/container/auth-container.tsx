import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './auth-container.module.css';
import { FooterAuth } from '../footer/footer-auth';
import { AuthTitle } from '../../../../features/layout';

interface AuthContainerComponentProps {
  children: ReactNode;
}

function AuthContainerComponent({ children }: AuthContainerComponentProps) {
  const { t } = useTranslation();

  return (
    <div className={`${styles.start} ${styles.auth_container}`}>
      <div className={styles.auth_area}>
        <AuthTitle />
        <div className={styles.auth_inner}>{children}</div>
        <FooterAuth />
      </div>
    </div>
  );
}

export const AuthContainer = memo(AuthContainerComponent);
