import { UseQueryOptions } from '@tanstack/react-query';
import { getQuerySkipToken } from '@learnway/shared';
import { HmgDepartmentService } from '../api/hmg-department';

export const queryKeys = {
  all: ['hmg-department-all'] as const,
  tree: (companyCode: string[]) => ['hmg-department-tree', ...companyCode],
  child: (companyCode: string, parentDeptId: string) => [
    'hmg-department-child',
    companyCode,
    parentDeptId,
  ],
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
  child: (param: any) => ({
    queryKey: queryKeys.child(param.companyCode, param.parentDeptId),
    queryFn: () => {
      return HmgDepartmentService.getDepartmentChildDepartmentList(param);
    },
  }),
};
