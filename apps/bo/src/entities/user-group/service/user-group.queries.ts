import { UserGroupManual, UserGroupsParam } from '@types';
import UserGroupsService from '../api/user-group';
import { QueryOptions } from '@tanstack/react-query';
import TenantService from '@entities/tenant/api/tenant';
import { tenantQueryKeys } from '@entities/tenant';
import { getQuerySkipToken, httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

export const queryKeys = {
  usergroups: ['user-groups'] as const,
  organizationTree: ['organization-tree'] as const,
  blackwhiteUsers: ['blackwhite-users'] as const,
  userGroupManualList: ['user-group-manual-list'] as const,
  userGroupManualDetail: ['user-group-manual-detail'] as const,
  userGroupSubDirectory: ['user-group-subdirectory'] as const,
};

export const queryOptions = {
  usergroups: (tenantIds: number[], params: UserGroupsParam) => ({
    queryKey: ['user-groups', params.userGroupType],
    queryFn: () => UserGroupsService.fetchUserGroups(tenantIds, params),
    cacheTime: 0,
    staleTime: 0,
    enabled: tenantIds.length > 0,
  }),
  organizationTree: (tenantIds: number[], tenantName?: string) => ({
    queryKey: queryKeys.organizationTree,
    queryFn: () => UserGroupsService.fetchOrganizationTree(tenantIds, tenantName),
    cacheTime: 0,
    staleTime: 0,
    enabled: tenantIds.length > 0,
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
  userGroupManualDetail: (userGroupId: number)  =>
    userGroupId ? {
      queryKey: queryKeys.userGroupManualDetail,
      queryFn: (): Promise<any> => UserGroupsService.fetchUserGroupManualDetail(userGroupId),
    }: getQuerySkipToken<UserGroupManual>(),
  userGroupSubDirectoryList: (params: any) => ({
    queryKey: queryKeys.userGroupSubDirectory,
    queryFn: () => UserGroupsService.fetchUserGroupSubDirectoryList(params),
    cacheTime: 0,
    staleTime: 0,
  })
};
