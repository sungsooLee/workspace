import { memo } from 'react';

import { useFetchAuthUser } from '../../../entities/user';
import { useFetchTenant } from '../../../entities/tenant';
import { Link } from '@tanstack/react-router';

const LogoComponent = () => {
  const { data } = useFetchAuthUser();
  const { data: tenant } = useFetchTenant(data?.activeTenantId);

  return (
    <Link to={'/'}>
      {(tenant?.logoImageUrl && (
        <img src={tenant?.logoImageUrl} title={tenant.name} className="h-16" />
      )) ??
        tenant?.name}
    </Link>
  );
};

export const Logo = memo(LogoComponent);
