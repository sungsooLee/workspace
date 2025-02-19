import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import { Logo, Notification, Tenant, Category } from '../../../../../features/layout';

import styles from './m.header.module.css';

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
        </div>
      </header>
    </div>
  );
}

export const MobileHeader = memo(HeaderComponent);
