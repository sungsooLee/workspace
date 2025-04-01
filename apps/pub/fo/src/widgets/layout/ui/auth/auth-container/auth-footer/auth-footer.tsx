import { memo } from 'react';
import { isMobile } from 'react-device-detect';
import { Link, useLocation } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Button, useModal } from '@learnway/ui';

//import styles from './auth-footer.module.css';
import styles from '@learnway/styles/fo/widgets/layout/ui/auth/auth-footer/auth-footer.module.css';

import { AgreementPopup, PrivacyPopup, ContactPopup } from '../../../../../../features/auth';
import { isSigninPage } from '../../../../../../features/platform';

function AuthFooterComponent() {
  const { open: openModal } = useModal();
  const location = useLocation();
  return (
    <div className={`${styles.start} ${styles.footer_auth}`}>
      <div className={styles.footer_area}>
        <ul className={styles.menu_list}>
          <li>
            <Button
              onClick={() =>
                openModal({
                  width: isMobile ? 'm_full' : 'sm',
                  content: <AgreementPopup />,
                })
              }>
              이용약관
            </Button>
          </li>
          <li>
            <Button
              onClick={() =>
                openModal({
                  width: isMobile ? 'm_full' : 'sm',
                  content: <PrivacyPopup />,
                })
              }>
              개인정보처리 방침
            </Button>
          </li>
          <li>
            <Button
              onClick={() =>
                openModal({
                  width: isMobile ? 'm_full' : 'lg',
                  content: <ContactPopup />,
                })
              }>
              고객지원
            </Button>
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
