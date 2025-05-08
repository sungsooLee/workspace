import { skipToken } from '@tanstack/react-query';

import { getQuerySkipToken } from '@learnway/shared';

import UsersService from '../api/users';

export const queryKeys = {
  all: ['users'] as const,
  detail: (userId: number) => [...queryKeys.all, userId] as const,
};

export const usersQueryOptions = {
  all: (params: any) => ({
    queryKey: queryKeys.all,
    queryFn: () => UsersService.fetchAllUsers(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  detail: (userId?: number) =>
    userId
      ? {
          queryKey: queryKeys.detail(userId),
          queryFn: () => UsersService.fetchUser(userId),
        }
      : getQuerySkipToken<any>(),
};

export const mutateOptions = {
  create: () => ({ mutationFn: (payload: any) => UsersService.createUser(payload) }),
};
