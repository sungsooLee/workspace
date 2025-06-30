import { UserGroupsParam } from '@types';
import UserGroupsService from '../api/user-group';

export const queryKeys = {
  all: ['all-user-groups'] as const,
};

export const queryOptions = {
  all: (params?: Partial<UserGroupsParam>) => ({
    queryKey: queryKeys.all,
    queryFn: () => UserGroupsService.fetchAllUserGroups(params),
    cacheTime: 0,
    staleTime: 0,
  }),
};
