import type { AxiosResponse } from 'axios';

import AuthorizationService from '../api/authorization';
import { User } from '../model/user';
import { cookieService } from '@learnway/shared';

export const queryKeys = {
  authUser: ['auth-user'] as const,
};

export const queryOptions = {
  authUser: () => ({
    queryKey: queryKeys.authUser,
    // queryFn: async () => new Promise((resolve) => resolve(null)),
    queryFn: async () => {
      const token = cookieService.get('LOGIN_TOKEN');
      const userId = cookieService.get('LOGIN_USER_ID');
      const tenantId = cookieService.get('LOGIN_TENANT_ID');
      const roleId = cookieService.get('LOGIN_ROLE_ID');

      if (!token || !userId || !tenantId || !roleId) {
        return null;
      }

      const mockResponse = await AuthorizationService.login({
        accountId: userId,
        orgId: 1,
        password: 'hae1234',
      });

      const userData = mockResponse.data.data;
      return {
        ...userData,
        activeTenantId: tenantId,
        activeRoleId: roleId,
      };
    },
  }),
};

export const mutateOptions = {
  login: () => ({
    mutationFn: (payload: any): Promise<AxiosResponse> =>
      AuthorizationService.login({ ...payload, orgId: Number(payload.orgId) }),
  }),
  logout: () => ({
    mutationFn: () => AuthorizationService.logout(),
  }),
};
