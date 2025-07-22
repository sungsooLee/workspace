import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import styles from './auth-footer.module.css';

function AuthFooterComponent() {
  return (
    <div className={`${styles.start} ${styles.footer_auth}`}>
      <div className={styles.footer_area}>
        <ul className={styles.menu_list}>
          <li>
            <a href="#" onClick={(e) => e.preventDefault()}>
              이용약관
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => e.preventDefault()}>
              개인정보처리 방침
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => e.preventDefault()}>
              고객지원
            </a>
          </li>
        </ul>
        <div className={styles.copyright}>
          copyright © 2023 Hyundai-Autoever. All rights reserved.{' '}
        </div>
      </div>
    </div>
  );
}

export const AuthFooter = memo(AuthFooterComponent);
