import { UseQueryOptions } from '@tanstack/react-query';
import { getQuerySkipToken } from '@learnway/shared';
import { DepartmentService } from '../api/department';

export const queryKeys = {
  list: ['department-page'] as const,
  all: ['department-all'] as const,
  tree: (companyCode: string) => ['department-tree', companyCode],
};

export const queryOptions = {
  list: (param: any) => ({
    queryKey: queryKeys.list,
    queryFn: () => DepartmentService.getDepartmentList(param),
    cacheTime: 0,
    staleTime: 0,
  }),

  tree: (companyCode: string) => ({
    queryKey: queryKeys.tree(companyCode),
    queryFn: () =>
      companyCode ? DepartmentService.getDepartmentTree(companyCode) : getQuerySkipToken(),
  }),
};
