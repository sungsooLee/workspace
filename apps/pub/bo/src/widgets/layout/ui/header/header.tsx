import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Logo,
  UserAvatar,
  Notification,
  Language,
  Navigate,
  QuickMenu,
} from '../../../../features/layout';

import styles from './header.module.css';

function HeaderComponent() {
  const { t } = useTranslation();

  return (
    <div className={styles.start}>
      <header className={styles.header}>
        <h1>
          <Logo />
          <strong className={styles.title}>{'HRD 센터'}</strong>
        </h1>
        <div className={styles.nav_area}>
          <Navigate />
        </div>

        <div className={styles.util}>
          <Language />
          <Notification />
          <UserAvatar />
        </div>

        <div className={styles.quick_menu}>
          <QuickMenu />
        </div>
      </header>
    </div>
  );
}

export const Header = memo(HeaderComponent);
