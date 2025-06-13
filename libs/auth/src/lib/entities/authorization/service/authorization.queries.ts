import { queryConfig } from '@learnway/config';
import { cookieService } from '@learnway/shared';

import AuthorizationService from '../api/authorization';
import { assignToken, removeToken, convertToAuthUser } from './authorization.service';

import type { AuthSSOLogin } from '../../../types';
import VerificationsService from '../api/verifications';

export const queryKeys = {
  authUser: ['auth-user'] as const,
  authSSO: ['auth-sso'] as const,
};

export const queryOptions = {
  authUser: () => ({
    queryKey: queryKeys.authUser,
    queryFn: async () => new Promise((resolve) => resolve(null)),
    ...queryConfig.cacheOptions(),
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
        const now = new Date();
        cookieService.set('LATEST_LOGIN_DATETIME', now);
        return { ...convertToAuthUser(data), latestLoginDatetime: now };
      } catch (e) {
        removeToken();
        throw e;
      }
    },
  }),
  logout: () => ({
    mutationFn: async (): Promise<any> => {
      await AuthorizationService.logout();
      cookieService.remove('LATEST_LOGIN_DATETIME');
      removeToken();
    },
  }),
  reissue: () => ({
    mutationFn: async (): Promise<any> => {
      try {
        const data = await AuthorizationService.reissue();
        assignToken(data);
        return {
          ...convertToAuthUser(data),
          latestLoginDatetime: cookieService.get('LATEST_LOGIN_DATETIME'),
        };
      } catch (e) {
        removeToken();
        throw e;
      }
    },
  }),
  sendVerifyPhoneNumber: () => ({
    mutationFn: (payload: any) => {
      return VerificationsService.sendVerifyPhoneNumer(payload);
    },
  }),
  sendVerifyEmail: () => ({
    mutationFn: (payload: any) => VerificationsService.sendVerifyEmail(payload),
  }),
  verifyPhoneNumber: () => ({
    mutationFn: (payload: any) => VerificationsService.verifyPhoneNumer(payload),
  }),
  verifyEmail: () => ({
    mutationFn: (payload: any) => VerificationsService.verifyEmail(payload),
  }),
  fetchEmail: () => ({
    mutationFn: (payload: any) => VerificationsService.fetchEmail(payload),
  }),
  updatePasswordByPhoneNumber: () => ({
    mutationFn: (payload: any) => VerificationsService.updatePasswordByPhoneNumber(payload),
  }),
  updatePasswordByEmail: () => ({
    mutationFn: (payload: any) => VerificationsService.updatePasswordByEmail(payload),
  }),
  updatePassword: () => ({
    mutationFn: (payload: any) => VerificationsService.updatePassword(payload),
  }),
  existsEmail: () => ({
    mutationFn: (payload: string) => VerificationsService.existsEmail(payload),
  }),
};
