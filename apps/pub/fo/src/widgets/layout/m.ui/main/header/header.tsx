import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';

import { cn } from '@learnway/shared';

import { Logo, Tenant, Notification, MobileNavigation } from '../../../../../features/layout';

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
          <Notification />
          <MobileNavigation />
        </div>
      </header>
    </div>
  );
}

export const MobileHeader = memo(HeaderComponent);
