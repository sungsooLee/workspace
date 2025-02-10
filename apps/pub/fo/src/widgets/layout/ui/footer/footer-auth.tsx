import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import styles from './footer-auth.module.css';

function FooterAuthComponent() {
  return (
    <div className={`${styles.start} ${styles.footer_auth}`}>
      <div className={styles.footer_area}>footer</div>
    </div>
  );
}

export const FooterAuth = memo(FooterAuthComponent);
