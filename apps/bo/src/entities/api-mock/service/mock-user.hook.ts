import { useQuery } from '@tanstack/react-query';
import { queryOptions } from './mock-user.queries';

export function useFetchMockUsers() {
  return useQuery(queryOptions.all());
}
