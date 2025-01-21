import { memo, useCallback } from 'react';
import { Tenant, useFetchTenantByUser } from '../../../entities/tenant';
import { useFetchAuthUser } from '../../../entities/user';
import { cookieService } from '@learnway/shared';
import { Popover } from '@learnway/ui';

const PopoverContent = ({
  data,
  onTenantSelect,
}: {
  data?: Tenant[];
  onTenantSelect: (tenantId: string) => void;
}) => {
  if (!data || !data?.length) {
    return null;
  }

  return (
    <div className="py-2">
      {data.map((tenant: Tenant, idx: number) => {
        return (
          <li
            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            value={tenant.id}
            key={`TENANT${idx}`}
            onClick={() => onTenantSelect(tenant.id + '')}>
            {tenant.name}
          </li>
        );
      })}
    </div>
  );
};

const TenantComponent = () => {
  const { data: userData } = useFetchAuthUser();
  const { data: tenants } = useFetchTenantByUser(userData?.accountId);

  const handleTenantSwitch = useCallback((tenantId: string) => {
    cookieService.set('LOGIN_TENANT_ID', tenantId);

    const currentUrl = new URL(window.location.href);
    const baseUrl = `${currentUrl.protocol}//${currentUrl.host}`;

    const newWindow = window.open(baseUrl, '_blank');

    if (newWindow) {
      newWindow.focus();
    }
  }, []);

  if (!tenants?.length) {
    return null;
  }

  const activeTenant =
    tenants.find((tenant) => tenant.id + '' === cookieService.get('LOGIN_TENANT_ID')) || tenants[0];

  return (
    <Popover popoverContent={<PopoverContent data={tenants} onTenantSelect={handleTenantSwitch} />}>
      <div className="cursor-pointer">{activeTenant?.name}</div>
    </Popover>
  );
};

export const Tenants = memo(TenantComponent);
