import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';

import { cn } from '@learnway/shared';
import { useFetchAuthUser } from '@learnway/auth';

import { Language, NotificationButton, TenantButton } from '../../../../../features/platform';
import { Logo, MobileNavigateButton } from '../../../../../features/layout';
import { useLogoutUser } from '@learnway/auth';
import { useFetchTenantByUser } from '../../../../../entities/tenant';

import styles from '@learnway/styles/fo/widgets/layout/m.ui/main/header/header.module.css';

function HeaderComponent() {
  const { t } = useTranslation();

  const { data: authUser } = useFetchAuthUser();
  const { data: tenants } = useFetchTenantByUser(authUser?.userId);

  return (
    <div className={styles.start}>
      <header className={styles.header}>
        <h1>
          <Logo />
          <TenantButton />
        </h1>

        <div className={styles.util}>
          <NotificationButton />
          <MobileNavigateButton />
        </div>
      </header>
    </div>
  );
}

export const MobileHeader = memo(HeaderComponent);
