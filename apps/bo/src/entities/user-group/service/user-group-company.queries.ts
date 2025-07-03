import { UserGroupCompanyService } from '../api/user-group-company';

export const queryKeys = {
  userGroups: (companyId: number) => ['usergroup-company-list', companyId],
  userGroupTree: (companyId: number) => ['usergroup-company-tree', companyId],
  userGroupUsers: ['usergroup-users'] as const,
};

export const queryOptions = {
  userGroups: (param: any) => ({
    queryKey: queryKeys.userGroups(param.companyId),
    queryFn: () => UserGroupCompanyService.getCompanyUserGroups(param),
    cacheTime: 0,
    staleTime: 0,
  }),
  userGroupTree: (companyId: number) => ({
    queryKey: queryKeys.userGroupTree(companyId),
    queryFn: () => UserGroupCompanyService.getCompanyOrganizationTree(companyId),
    disabled: !companyId,
  }),
  userGroupUsers: (param: any) => ({
    queryKey: queryKeys.userGroupUsers,
    queryFn: () => UserGroupCompanyService.getSubdirectoryUsers(param),
    cacheTime: 0,
    staleTime: 0,
  }),
};
