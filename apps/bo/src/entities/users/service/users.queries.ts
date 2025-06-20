import { skipToken } from '@tanstack/react-query';

import { getQuerySkipToken } from '@learnway/shared';

import UsersService from '../api/users';

export const queryKeys = {
  all: ['users'] as const,
  list: ['list'] as const,
  detail: (userUuid: string) => [...queryKeys.all, userUuid] as const,
};

export const usersQueryOptions = {
  all: (params: any) => ({
    queryKey: queryKeys.all,
    queryFn: () => UsersService.fetchListUsers(params),
    cacheTime: 0,
    staleTime: 0,
  }),

  list: (params: any) => ({
    queryKey: queryKeys.list,
    queryFn: () => UsersService.fetchListUsers(params),
  }),
  detail: (userUuid?: string) =>
    userUuid
      ? {
          queryKey: queryKeys.detail(userUuid),
          queryFn: () => UsersService.fetchUser(userUuid),
        }
      : getQuerySkipToken<any>(),
};

export const mutateOptions = {
  create: () => ({ mutationFn: (payload: any) => UsersService.createUser(payload) }),
};
