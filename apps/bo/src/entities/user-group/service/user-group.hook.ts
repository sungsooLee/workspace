import { useQuery } from '@tanstack/react-query';
import { queryOptions } from './user-group.queries';
import { UserGroupsParam } from '@types';

export function useFetchUserGroup(tenantIds: number[], params: Partial<UserGroupsParam>) {
  return useQuery(queryOptions.usergroups(tenantIds, params));
}
