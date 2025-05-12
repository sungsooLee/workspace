import UserGroupsService from '../api/user-groups';

export const queryKeys = {
  all: ['user-groups'] as const,
};

export const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: () => UserGroupsService.fetchAllUserGroups(),
    cacheTime: 0,
    staleTime: 0,
  }),
};
