import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import { Logo, UserAvatar, Notification } from '../../../../../features/layout';
import { Language } from '../../../../../features/platform';

import styles from './auth-header.module.css';

function AuthHeaderComponent() {
  const { t } = useTranslation();

  return (
    <div className={`${styles.start} ${styles.header_auth}`}>
      <header className={styles.header_area}>
        <h1>
          <Logo />
        </h1>
        <Language />
      </header>
    </div>
  );
}

export const AuthHeader = memo(AuthHeaderComponent);
