import { UserGroupCompanyService } from '../api/user-group-company';

export const queryKeys = {
  userGroups: (companyId: number) => ['usergroup-company-list', companyId],
  userGroupTree: (companyId: number, roleId: number) => [
    'usergroup-company-tree',
    companyId,
    roleId,
  ],
  userGroupUsers: ['usergroup-users'] as const,
};

export const queryOptions = {
  userGroups: (param: any) => ({
    queryKey: queryKeys.userGroups(param.companyId),
    queryFn: () => UserGroupCompanyService.getCompanyUserGroups(param),
    cacheTime: 0,
    staleTime: 0,
  }),
  userGroupTree: (param: any) => ({
    queryKey: queryKeys.userGroupTree(param.companyId, param.roleId),
    queryFn: () => UserGroupCompanyService.getCompanyOrganizationTree(param),
    cacheTime: 0,
    staleTime: 0,
  }),
  userGroupUsers: (param: any) => ({
    queryKey: queryKeys.userGroupUsers,
    queryFn: () => UserGroupCompanyService.getSubdirectoryUsers(param),
    cacheTime: 0,
    staleTime: 0,
  }),
};
