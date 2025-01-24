import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Logo, UserAvatar, Notification, Language, UserName } from '../../../../features/layout';
import { Navigate } from './navigate/navigate';
import { Category } from './category/category';
import { IcoMenu01 } from '@learnway/icons';
import styles from './header.module.css';

function HeaderComponent() {
  const { t } = useTranslation();

  return (
    <div className={`${styles.start} ${styles.header}`}>
      <header className={styles.header_area}>
        <h1>
          <Logo />
        </h1>

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
