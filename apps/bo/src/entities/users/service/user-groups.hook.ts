import { useQuery } from '@tanstack/react-query';

import { queryOptions } from './user-groups.queries';

export function useFetchUserGroups() {
  return useQuery(queryOptions.all());
}
