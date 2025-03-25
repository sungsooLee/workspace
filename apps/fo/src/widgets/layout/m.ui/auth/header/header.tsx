import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';

import { cn } from '@learnway/shared';

import { Language, Notification, Tenants } from '../../../../../features/platform';

import { Logo } from '../../../../../features/layout';
import { useFetchAuthUser } from '../../../../../../../../libs/config/src';
import { useFetchTenantByUser } from '../../../../../entities/tenant';

import styles from './header.module.css';
//import styles from '@learnway/styles/fo/widgets/layout/m.ui/auth/header/header.module.css';

function HeaderComponent() {
  const { t } = useTranslation();

  const { data: authUser } = useFetchAuthUser();
  const { data: tenants } = useFetchTenantByUser(authUser?.userTsid);

  return (
    <div className={`${styles.start} ${styles.auth_header}`}>
      <header className={styles.header_area}>
        <h1>
          <Logo />
        </h1>

        <Language className={styles.auth} />
      </header>
    </div>
  );
}

export const MobileHeader = memo(HeaderComponent);
