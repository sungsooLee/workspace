import { useMemo } from 'react';
import { AuthUser } from '@learnway/auth/types';

export const useIsManager = (options: { loginUser: AuthUser | undefined }) => {
  const isManager = useMemo(() => {
    const currentTenant = options.loginUser?.activeTenant?.tenantId;
    if (!currentTenant || !options.loginUser?.roles) return false;

    return options.loginUser.roles.some(
      (role) =>
        ['PLATFORM_MANAGER', 'TENANT_MANAGER'].includes(role.roleType) &&
        role.tenantId === currentTenant,
    );
  }, [options.loginUser]);

  return isManager;
};
