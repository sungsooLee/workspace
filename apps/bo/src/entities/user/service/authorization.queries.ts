import AuthorizationService from '../api/authorization';
import { assignToken, removeToken } from './authorization.service';
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
    mutationFn: async (payload: any): Promise<any> => {
      try {
        const data = await AuthorizationService.login({ ...payload, orgId: Number(payload.orgId) });
        assignToken(data);

        const user = data.data;
        const { tenantIds } = user;
        return {
          ...user,
          activeTenantId: user.tenantIds?.length > 0 ? tenantIds[0] : null,
          //activeRoleId: user.roles?.length > 0 ? user.roles[0].roleId : null,
        };
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

        const user = data.data;
        const { tenantIds } = user;
        return {
          ...user,
          activeTenantId: user.tenantIds?.length > 0 ? tenantIds[0] : null,
          //activeRoleId: user.roles?.length > 0 ? user.roles[0].roleId : null,
        };
      } catch (e) {
        removeToken();
        throw e;
      }
    },
  }),
};
