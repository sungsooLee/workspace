import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Category, GnbInput, Logo, Notification, Tenants } from '../../../../features/layout';
import { Navigate } from './navigate/navigate';
import { Language } from '../../../../features/layout/ui/language';
import { UserAvatar } from '../../../../features/layout/ui/user-avatar';
import { cookieService } from '@learnway/shared';
import { useFetchAuthUser } from '../../../../entities/user';
import { Tenant, useFetchTenantByUser } from '../../../../entities/tenant';

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
    <div className="bg-secondary-1 flex flex-col">
      <div className="flex items-center gap-10">
        <Logo activeTenant={activeTenant} />
        <Tenants
          tenants={tenants}
          activeTenant={activeTenant}
          onTenantSwitch={handleTenantSwitch}
        />
        <GnbInput />
        <Language />
        <Notification />
        <UserAvatar />
      </div>
      <div className="flex items-center gap-10">
        <Category />
        <Navigate />
      </div>
    </div>
  );
}

export const GNB = memo(GNBComponent);
