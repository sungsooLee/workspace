import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';

import { hmgQueryKeys, hmgQueryOptions } from './hmg-department.queries';

export function useGetCompanyHmgDepartmentTree(companyCode: string[]) {
  return useQuery(hmgQueryOptions.tree(companyCode));
}
