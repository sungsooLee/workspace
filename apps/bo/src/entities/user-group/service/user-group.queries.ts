import { SubdirectoryUsersParam, UserGroupsParam } from '@types';
import UserGroupsService from '../api/user-group';

export const queryKeys = {
  usergroups: ['user-groups'] as const,
  organizationTree: ['organization-tree'] as const,
  subdirectoryUsers: ['subdirecory-users'] as const,
};

export const queryOptions = {
  usergroups: (tenantIds: number[], params: UserGroupsParam) => ({
    queryKey: ['user-groups', params.userGroupType],
    queryFn: () => UserGroupsService.fetchUserGroups(tenantIds, params),
    cacheTime: 0,
    staleTime: 0,
  }),
  organizationTree: (tenantIds: number[], tenantName?: string) => ({
    queryKey: queryKeys.organizationTree,
    queryFn: () => UserGroupsService.fetchOrganizationTree(tenantIds, tenantName),
    cacheTime: 0,
    staleTime: 0,
  }),
  subdirectoryUsers: (params: Partial<SubdirectoryUsersParam>) => ({
    queryKey: queryKeys.subdirectoryUsers,
    queryFn: () => UserGroupsService.subdirectoryUsers(params),
    cacheTime: 0,
    staleTime: 0,
  }),
};
