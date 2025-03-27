import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';

import { cn } from '@learnway/shared';

import { Logo, Tenant, NotificationM, NavigationM } from '../../../../../features/layout';

import styles from '@learnway/styles/fo/widgets/layout/m.ui/main/header/header.module.css';

function HeaderComponent() {
  const { t } = useTranslation();

  return (
    <div className={styles.start}>
      <header className={styles.header}>
        <h1>
          <Logo />
          <Tenant />
        </h1>

        <div className={styles.util}>
          <NotificationM />
          <NavigationM />
        </div>
      </header>
    </div>
  );
}

export const MobileHeader = memo(HeaderComponent);
