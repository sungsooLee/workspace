import { UseQueryOptions } from '@tanstack/react-query';
import { getQuerySkipToken } from '@learnway/shared';
import { HmgDepartmentService } from '../api/hmg-department';

export const queryKeys = {
  all: ['hmg-department-all'] as const,
  tree: (companyCode: string[]) => ['hmg-department-tree', ...companyCode],
};

export const queryOptions = {
  tree: (companyCode: string[]) => ({
    queryKey: queryKeys.tree(companyCode),
    queryFn: () => {
      const companys = companyCode.filter((item) => item !== undefined);
      return companys.length > 0 ? HmgDepartmentService.getDepartmentTree(companyCode) : undefined;
    },
    disabled: !companyCode,
  }),
};
