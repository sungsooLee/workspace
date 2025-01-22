import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Navigate } from './navigate/navigate';
import { QuickMenu } from './quick-menu/quick-menu';
import { Logo, UserAvatar, Notification, Language } from '../../../../features/layout';

import styles from './gnb.module.css';

function GNBComponent() {
  const { t } = useTranslation();

  return (
    <div className={`${styles.start} nlp--header`}>
      <header className={styles.header}>
        <h1>
          <Logo />
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

export const GNB = memo(GNBComponent);
