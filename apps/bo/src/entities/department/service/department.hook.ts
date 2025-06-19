import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';

import { queryKeys, queryOptions } from './department.queries';

export function useGetCompanyDepartmentTree(companyCode: string[]) {
  return useQuery(queryOptions.tree(companyCode));
}

export function useGetCompanyDepartmentList(param: any) {
  return useQuery(queryOptions.list(param));
}

export function useGetCompanyDepartmentDetail(deptId: number) {
  return useQuery(queryOptions.detail(deptId));
}
