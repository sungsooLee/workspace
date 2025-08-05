import { getQuerySkipToken } from '@learnway/shared';
import { UserGroupManual, UserGroupsParam } from '@shared/types/user-group';
import UserGroupsService from '../api/user-group';

export const queryKeys = {
  usergroups: ['user-groups'] as const,
  organizationTree: ['organization-tree'] as const,
  customGroupsTree: ['custom-groups-tree'] as const,
  blackwhiteUsers: ['blackwhite-users'] as const,
  userGroupManualList: ['user-group-manual-list'] as const,
  userGroupManualDetail: ['user-group-manual-detail'] as const,
  userGroupSubDirectory: ['user-group-subdirectory'] as const,
};

export const queryOptions = {
  usergroups: (tenantIds: number[], roleId: number, params: UserGroupsParam) => ({
    queryKey: ['user-groups', params.userGroupType],
    queryFn: () => UserGroupsService.fetchUserGroups(tenantIds, roleId, params),
    cacheTime: 0,
    staleTime: 0,
    enabled: tenantIds.length > 0,
  }),
  organizationTree: (tenantIds: number[], roleId: number, tenantName?: string) => ({
    queryKey: queryKeys.organizationTree,
    queryFn: () => UserGroupsService.fetchOrganizationTree(tenantIds, roleId, tenantName),
    cacheTime: 0,
    staleTime: 0,
    enabled: tenantIds.length > 0 && !!roleId,
  }),
  customGroupsTree: (roleId: number, userGroupName?: string) => ({
    queryKey: queryKeys.customGroupsTree,
    queryFn: () => UserGroupsService.fetchCustomGroupsTree(roleId, userGroupName),
    cacheTime: 0,
    staleTime: 0,
    enabled: !!roleId,
  }),
  blackwhiteUsers: (params: any) => ({
    queryKey: ['blackwhite-users', params.companyId, params.page],
    queryFn: () => UserGroupsService.fetchBlackwhiteUsers(params),
  }),
  userGroupManualList: (params: any) => ({
    queryKey: queryKeys.userGroupManualList,
    queryFn: () => UserGroupsService.fetchUserGroupManualList(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  userGroupManualDetail: (userGroupId: number) =>
    userGroupId
      ? {
          queryKey: queryKeys.userGroupManualDetail,
          queryFn: (): Promise<any> => UserGroupsService.fetchUserGroupManualDetail(userGroupId),
        }
      : getQuerySkipToken<UserGroupManual>(),
  userGroupSubDirectoryList: (params: any) => ({
    queryKey: queryKeys.userGroupSubDirectory,
    queryFn: () => UserGroupsService.fetchUserGroupSubDirectoryList(params),
    cacheTime: 0,
    staleTime: 0,
  }),
};

export const userGroupManualOptions = {
  create: () => ({
    mutationFn: (payload: any) => UserGroupsService.createUserGroupManual(payload),
  }),
  update: () => ({
    mutationFn: (payload: any) => UserGroupsService.updateUserGroupManual(payload),
  }),
};
