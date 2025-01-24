import { memo } from 'react';

import { useAuth, useFetchAuthUser } from '../../../entities/user';
import { Tenant, useFetchTenant } from '../../../entities/tenant';
import { Link } from '@tanstack/react-router';

interface LogoComponentProps {
  activeTenant: Tenant | null;
}

const LogoComponent = ({ activeTenant }: LogoComponentProps) => {
  return (
    <Link to={'/'}>
      {/* {(tenant?.logoImageUrl && (
        <img src={tenant?.logoImageUrl} title={tenant.name} className="h-16" />
      )) ??
        tenant?.name} */}
      {/* {activeTenant.} */}
      <div className="min-w-[100px] cursor-pointer">{activeTenant?.name || '로고'}</div>
    </Link>
  );
};

export const Logo = memo(LogoComponent);
