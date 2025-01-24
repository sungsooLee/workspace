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
      if (!token) {
        return null;
      }
      //
      const response = await AuthorizationService.getCurrentUser();
      const userData = response.data.data;

      return {
        ...userData,
        activeTenantId: cookieService.get('LOGIN_TENANT_ID'),
        activeRoleId: cookieService.get('LOGIN_ROLE_ID'),
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
