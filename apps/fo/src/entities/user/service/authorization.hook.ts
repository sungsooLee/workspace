import { useQuery } from '@tanstack/react-query';

import { queryOptions } from './authorization.queries';

export function useLogin(payload: any) {
  return useQuery(queryOptions.all(payload));
}
