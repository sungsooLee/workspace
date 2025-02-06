import MockUserService from '../api/mock-user';

export const queryKeys = {
  all: ['mock-user'] as const,
};

export const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: () => MockUserService.fetchUsers(),
    cacheTime: 0,
    /*enabled: false,*/
  }),
};
