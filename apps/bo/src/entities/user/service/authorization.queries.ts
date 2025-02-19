import type { AxiosResponse } from 'axios';

import AuthorizationService from '../api/authorization';
import { setAuthorization, removeAuthorization } from './authorization.service';
import { User } from '../model/user';

export const queryKeys = {
  authUser: ['auth-user'] as const,
};

export const queryOptions = {
  authUser: () => ({
    queryKey: queryKeys.authUser,
    queryFn: async () => new Promise((resolve) => resolve(null)),
  }),
};

export const mutateOptions = {
  login: () => ({
    mutationFn: async (payload: any): Promise<AxiosResponse> => {
      try {
        const data = await AuthorizationService.login({ ...payload, orgId: Number(payload.orgId) });
        return setAuthorization(data);
      } catch (e) {
        removeAuthorization();
        throw e;
      }
    },
  }),
  logout: () => ({
    mutationFn: async () => {
      await AuthorizationService.logout();
      removeAuthorization();
    },
  }),
  reissue: () => ({
    mutationFn: async (): Promise<AxiosResponse> => {
      try {
        console.log('AuthorizationService.reissue');
        const data = await AuthorizationService.reissue();
        return setAuthorization(data);
      } catch (e) {
        removeAuthorization();
        throw e;
      }
    },
  }),
};
