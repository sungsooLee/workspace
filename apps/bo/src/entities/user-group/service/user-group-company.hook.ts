import { useQuery } from '@tanstack/react-query';
import { queryOptions } from './user-group-company.queries';

export function useGetCompanyUserGroups(param: any) {
  return useQuery(queryOptions.userGroups(param));
}

export function useGetCompanyOrganizationTree(companyId: number) {
  return useQuery(queryOptions.userGroupTree(companyId));
}
