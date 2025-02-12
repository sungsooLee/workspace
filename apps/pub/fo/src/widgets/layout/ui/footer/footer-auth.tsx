import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import styles from './footer-auth.module.css';

function FooterAuthComponent() {
  return (
    <div className={`${styles.start} ${styles.footer_auth}`}>
      <div className={styles.footer_area}>
        <ul className={styles.menu_list}>
          <li>
            <Link to={''}>이용약관</Link>
          </li>
          <li>
            <Link to={''}>개인정보처리 방침</Link>
          </li>
          <li>
            <Link to={''}>고객지원</Link>
          </li>
        </ul>
        <div className={styles.copyright}>
          copyright © 2023 Hyundai-Autoever. All rights reserved.{' '}
        </div>
      </div>
    </div>
  );
}

export const FooterAuth = memo(FooterAuthComponent);
