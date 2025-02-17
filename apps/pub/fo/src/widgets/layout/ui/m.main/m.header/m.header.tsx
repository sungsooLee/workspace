import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import { Logo, Notification } from '../../../../../features/layout';

import styles from './m.header.module.css';

function HeaderComponent() {
  const { t } = useTranslation();

  return (
    <div className={styles.start}>
      <header className={styles.header}>
        <h1>
          <Logo />
          <strong className={styles.title}>{'HRD 센터'}</strong>
        </h1>

        <div className={styles.util}>
          <Notification />
        </div>
      </header>
    </div>
  );
}

export const MobileHeader = memo(HeaderComponent);
