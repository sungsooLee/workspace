import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';

import { cn } from '@learnway/shared';

import { Language, Notification, TenantButton } from '../../../../../features/platform';
import { Logo, MobileNavigateButton } from '../../../../../features/layout';
import { useFetchAuthUser } from '../../../../../../../../libs/config/src';
import { useFetchTenantByUser } from '../../../../../entities/tenant';

import styles from '@learnway/styles/fo/widgets/layout/m.ui/main/header/header.module.css';

function HeaderComponent() {
  const { t } = useTranslation();

  const { data: authUser } = useFetchAuthUser();
  const { data: tenants } = useFetchTenantByUser(authUser?.userTsid);

  return (
    <div className={styles.start}>
      <header className={styles.header}>
        <h1>
          <Logo />
          <TenantButton />
        </h1>

        <div className={styles.util}>
          <Notification />
          <MobileNavigateButton />
        </div>
      </header>
    </div>
  );
}

export const MobileHeader = memo(HeaderComponent);
