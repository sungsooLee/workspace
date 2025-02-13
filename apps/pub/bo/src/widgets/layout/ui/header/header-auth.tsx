import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { LogoAuth, LanguageAuth } from '../../../../features/layout';
import styles from './header-auth.module.css';

function HeaderAuthComponent() {
  const { t } = useTranslation();

  return (
    <div className={`${styles.start} ${styles.header_auth}`}>
      <header className={styles.header_area}>
        <h1>
          <LogoAuth />
        </h1>

        <LanguageAuth />
      </header>
    </div>
  );
}

export const HeaderAuth = memo(HeaderAuthComponent);
