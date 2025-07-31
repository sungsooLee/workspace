import { getQuerySkipToken } from '@learnway/shared';

import { UsersParams } from '@types';
import UsersService from '../api/users';

export const queryKeys = {
  all: ['users'] as const,
  list: ['list'] as const,
  detail: (userUuid: string) => [...queryKeys.all, userUuid] as const };

export const usersQueryOptions = {
  all: (params: UsersParams) => ({
    queryKey: queryKeys.all,
    queryFn: () => UsersService.fetchListUsers(params),
    cacheTime: 0,
    staleTime: 0 }),

  list: (params: UsersParams) => ({
    queryKey: queryKeys.list,
    queryFn: () => UsersService.fetchListUsers(params) }),
  detail: (userUuid?: string) =>
    userUuid
      ? {
          queryKey: queryKeys.detail(userUuid),
          queryFn: () => UsersService.fetchUser(userUuid) }
      : getQuerySkipToken<any>() };

export const mutateOptions = {
  create: () => ({ mutationFn: (payload: any) => UsersService.createUser(payload) }),
  update: () => ({ mutationFn: (payload: any) => UsersService.updateUser(payload) }),
  unlock: () => ({ mutationFn: (payload: any) => UsersService.unlockUser(payload) }),
  approve: () => ({ mutationFn: (uuids: string[]) => UsersService.approveAccountUser(uuids) }),
  reject: () => ({ mutationFn: (uuids: string[]) => UsersService.rejectAccountUser(uuids) }) };
