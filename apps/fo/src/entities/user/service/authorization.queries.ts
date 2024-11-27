import AuthorizationService from '../api/authorization';

export const queryKeys = {
  all: ['authorization'] as const,
};

export const queryOptions = {
  all: (payload: any) => ({
    queryKey: queryKeys.all,
    queryFn: () => AuthorizationService.login(payload),
  }),
};
