import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys, queryOptions, mutateOptions } from './department.queries';

export function useGetCompanyDepartmentTree(companyCode: string[]) {
  return useQuery(queryOptions.tree(companyCode));
}

export function useGetCompanyDepartmentList(param: any) {
  return useQuery(queryOptions.list(param));
}

export function useGetCompanyDepartmentDetail(deptId: number) {
  return useQuery(queryOptions.detail(deptId));
}

export function useCreateDepartment(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.create(),
    onSuccess: async (data: any, variables, context) => {
      // 공통 메세지 처리 등...
      queryClient.invalidateQueries({ queryKey: queryKeys.list });
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    create: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useUpdateDepartment(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...mutateOptions.update(),
    onSuccess: async (data: any, variables, context) => {
      // 공통 메세지 처리 등...
      queryClient.invalidateQueries({ queryKey: queryKeys.list });
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });

  return {
    update: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}
