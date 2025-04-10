import { useQuery } from '@tanstack/react-query';

import { queryOptions } from './companies.queries';

export function useFetchCompanies() {
  return useQuery(queryOptions.all());
}
