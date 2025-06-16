import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';

import { queryKeys, queryOptions } from './hmg-department.queries';

export function useGetCompanyHmgDepartmentTree(companyCode: string[]) {
  return useQuery(queryOptions.tree(companyCode));
}
