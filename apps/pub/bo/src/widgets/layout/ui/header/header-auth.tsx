import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Logo, Language } from '../../../../features/layout';
import styles from './header-auth.module.css';

function HeaderAuthComponent() {
  const { t } = useTranslation();

  return (
    <div className={`${styles.start} ${styles.header_auth}`}>
      <header className={styles.header_area}>
        <h1>
          <Logo headerType={'login'} />
        </h1>

        <Language className={styles.auth} />
      </header>
    </div>
  );
}

export const HeaderAuth = memo(HeaderAuthComponent);
