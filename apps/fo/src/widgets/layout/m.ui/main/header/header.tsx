import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useFetchAuthUser } from '@learnway/auth/entities';

import { useFetchTenantByUser } from '@entities/tenant';
import { Logo, MobileNavigateButton } from '@features/layout';
import { TenantButton } from '@features/platform';

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
        </h1>

        <div className={styles.tenant}>
          <TenantButton />
        </div>

        <div className={styles.util}>
          {/* <NotificationButton /> */}
          <MobileNavigateButton />
        </div>
      </header>
    </div>
  );
}

/**
 * @description MO 헤더 FO_GNB_MA_1000
 *
 */
export const MobileHeader = memo(HeaderComponent);
