import AuthorizationService from '../api/authorization';
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
    mutationFn: (payload: any) =>
      AuthorizationService.login({ ...payload, orgId: Number(payload.orgId) }),
  }),
  logout: () => ({
    mutationFn: () => AuthorizationService.logout(),
  }),
};
