import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  Logo,
  UserAvatar,
  Notification,
  Language,
  UserName,
  Navigate,
  Category,
  Tenant,
} from '../../../../features/layout';
import styles from './header.module.css';

function HeaderComponent() {
  const { t } = useTranslation();

  return (
    <div className={`${styles.start} ${styles.header}`}>
      <header className={styles.header_area}>
        <div className={styles.logo_inner}>
          <h1>
            <Logo />
          </h1>
          <Tenant />
        </div>

        <div className={styles.util}>
          <UserName />
          <Language />
          <Notification />
          <UserAvatar />
        </div>

        <div className={styles.nav_area}>
          <Category />
          <Navigate />
        </div>
      </header>
    </div>
  );
}

export const Header = memo(HeaderComponent);
