import AuthorizationService from '../api/authorization';
import { assignToken, removeToken, convertToAuthUser } from './authorization.service';

import type { AuthSSOLogin } from '../../../types';

export const queryKeys = {
  authUser: ['auth-user'] as const,
  authSSO: ['auth-sso'] as const,
};

export const queryOptions = {
  authUser: () => ({
    queryKey: queryKeys.authUser,
    queryFn: async () => new Promise((resolve) => resolve(null)),
  }),
  healthcheck: (comanyCode: string) => ({
    queryKey: queryKeys.authSSO,
    queryFn: async () => AuthorizationService.healthcheck(comanyCode),
  }),
  authSSOLogin: (payload: AuthSSOLogin) => ({
    queryKey: queryKeys.authSSO,
    queryFn: async () => AuthorizationService.ssoLogin(payload),
  }),
};

export const mutateOptions = {
  login: () => ({
    mutationFn: async (payload: any): Promise<any> => {
      try {
        const data = await AuthorizationService.login({ ...payload, orgId: Number(payload.orgId) });
        assignToken(data);
        return convertToAuthUser(data);
      } catch (e) {
        removeToken();
        throw e;
      }
    },
  }),
  logout: () => ({
    mutationFn: async () => {
      await AuthorizationService.logout();
      removeToken();
    },
  }),
  reissue: () => ({
    mutationFn: async (): Promise<any> => {
      try {
        const data = await AuthorizationService.reissue();
        assignToken(data);
        return convertToAuthUser(data);
      } catch (e) {
        removeToken();
        throw e;
      }
    },
  }),
};
