import { useQuery } from '@tanstack/react-query';
import { queryOptions } from './user-group.queries';
import { UserGroupType } from '@types';

export function useFetchUserGroup(params: { userGroupType: UserGroupType; userGroupName: string }) {
  return useQuery(queryOptions.all(params));
}
