import { useQuery } from '@tanstack/react-query';
import { queryOptions } from './user-group.queries';
import { UserGroupsParam } from '@types';

export function useFetchUserGroups(tenantIds: number[], params: UserGroupsParam) {
  return useQuery(queryOptions.usergroups(tenantIds, params));
}

export function useFetchOrganizationTree(tenantIds: number[], tenantName?: string) {
  return useQuery(queryOptions.organizationTree(tenantIds, tenantName));
}
