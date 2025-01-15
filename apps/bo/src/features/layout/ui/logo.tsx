import { memo } from 'react';
import { Link } from '@tanstack/react-router';

import { useFetchAuthUser } from '../../../entities/user';
import { useFetchTenant } from '../../../entities/tenant';

const LogoCompoment = () => {
  const { data } = useFetchAuthUser();
  const { data: tenant } = useFetchTenant(data?.activeTenantId);

  return (
    <Link to={'/menu5/menu5-1'}>
      {(tenant?.logoImageUrl && (
        <img src={tenant?.logoImageUrl} title={tenant.name} className="h-16" />
      )) ??
        tenant?.name}
    </Link>
  );
};

export const Logo = memo(LogoCompoment);
