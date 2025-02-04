import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Category,
  Search,
  Logo,
  Notification,
  Tenants,
  AdminLink,
} from '../../../../features/layout';
import { Navigate } from './navigate/navigate';
import { Language } from '../../../../features/layout/ui/language';
import { UserAvatar } from '../../../../features/layout/ui/user-avatar';
import { cookieService } from '@learnway/shared';
import { useFetchAuthUser } from '../../../../entities/user';
import { Tenant, useFetchTenantByUser } from '../../../../entities/tenant';
import styles from './gnb.module.css';

function GNBComponent() {
  const { data: userData } = useFetchAuthUser();
  const { data: tenants } = useFetchTenantByUser(userData?.accountId);
  const [activeTenant, setActiveTenant] = useState<Tenant | null>(() => {
    const storedTenant = sessionStorage.getItem('ACTIVE_TENANT');
    if (storedTenant) {
      return JSON.parse(storedTenant);
    }

    if (!window.opener && !storedTenant) {
      return null;
    }

    return null;
  });

  useEffect(() => {
    if (!activeTenant && tenants?.length) {
      // 새로운 윈도우로 열렸을 떄 URL에서 테넌트 아이디 갖고옴.
      if (window.opener) {
        const params = new URLSearchParams(window.location.search);
        const tenantId = params.get('tenantId');
        const tenant = tenants.find((t) => t.id.toString() === tenantId);
        if (tenant) {
          setActiveTenant(tenant);
          sessionStorage.setItem('ACTIVE_TENANT', JSON.stringify(tenant));
        }
      } else {
        const tenantId = cookieService.get('LOGIN_TENANT_ID');
        const tenant = tenants.find((t) => t.id.toString() === tenantId) || tenants[0];
        setActiveTenant(tenant);
        sessionStorage.setItem('ACTIVE_TENANT', JSON.stringify(tenant));
      }
    }
  }, [tenants]);

  const handleTenantSwitch = useCallback((tenant: Tenant) => {
    setActiveTenant(tenant);
    sessionStorage.setItem('ACTIVE_TENANT', JSON.stringify(tenant));

    const currentUrl = new URL(window.location.href);
    const baseUrl = `${currentUrl.protocol}//${currentUrl.host}`;

    const newUrl = new URL(baseUrl);
    newUrl.searchParams.set('tenantId', tenant.id.toString());

    const newWindow = window.open(newUrl.toString(), '_blank');
    if (newWindow) {
      newWindow.focus();
    }
  }, []);

  return (
    <div className={`${styles.start} ${styles.header}`}>
      <header className={styles.header_area}>
        <div className={styles.logo_inner}>
          <h1>
            <Logo activeTenant={activeTenant} />
          </h1>

          <Tenants
            tenants={tenants || []}
            activeTenant={activeTenant}
            onTenantSwitch={handleTenantSwitch}
          />
        </div>
        <div className={styles.search_form}>
          <Search />
        </div>
        <div className={styles.util}>
          <AdminLink />
          <Language />
          <Notification />
          <UserAvatar />
        </div>
        <div className={styles.nav_area}>
          <Category />
          <Navigate />
        </div>
      </header>
    </div>
  );
}

export const GNB = memo(GNBComponent);
