import { useQuery } from '@tanstack/react-query';
import { queryOptions } from './user-group.queries';
import { UserGroupsParam } from '@types';

export function useFetchUserGroup(params: Partial<UserGroupsParam>) {
  return useQuery(queryOptions.all(params));
}
