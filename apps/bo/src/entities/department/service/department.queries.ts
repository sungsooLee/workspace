import { UseQueryOptions } from '@tanstack/react-query';
import { getQuerySkipToken } from '@learnway/shared';
import { DepartmentService } from '../api/department';

export const queryKeys = {
  all: ['department-all'] as const,
  list: ['department-page'] as const,
  detail: (deptId: number) => ['department-detail', deptId],
  tree: (companyCode: string[]) => ['department-tree', ...companyCode],
  child: (param: any) => ['department-child', param],
  user: (param: any) => ['department-user', param],
};

export const queryOptions = {
  list: (param: any) => ({
    queryKey: queryKeys.list,
    queryFn: () => DepartmentService.getDepartmentList(param),
    cacheTime: 0,
    staleTime: 0,
  }),
  detail: (deptId: number) => ({
    queryKey: queryKeys.detail(deptId),
    queryFn: () => {
      return deptId ? DepartmentService.getDepartmentDetail(deptId) : undefined;
    },
    disabled: !deptId,
  }),

  tree: (companyCode: string[]) => ({
    queryKey: queryKeys.tree(companyCode),
    queryFn: () => {
      const companys = companyCode.filter((item) => item !== undefined);
      return companys.length > 0 ? DepartmentService.getDepartmentTree(companyCode) : undefined;
    },
    disabled: !companyCode,
  }),
  child: (param: any) => ({
    queryKey: queryKeys.child(param),
    queryFn: () => {
      return DepartmentService.getDepartmentChildDepartmentList(param);
    },
  }),
  user: (param: any) => ({
    queryKey: queryKeys.user(param),
    queryFn: () => {
      return DepartmentService.getDepartmentUserList(param);
    },
  }),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: any) => DepartmentService.createDepartment(payload),
  }),
  update: () => ({
    mutationFn: (payload: any) => DepartmentService.updateDepartment(payload),
  }),
  delete: () => ({
    mutationFn: (payload: any) => DepartmentService.deleteDepartment(payload),
  }),
};
