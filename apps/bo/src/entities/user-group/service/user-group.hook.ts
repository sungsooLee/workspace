import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserGroupsParam } from '@types';
import { queryKeys, queryOptions, userGroupManualOptions } from './user-group.queries';

export function useFetchUserGroups(tenantIds: number[], roleId = 0, params: UserGroupsParam) {
  return useQuery(queryOptions.usergroups(tenantIds, roleId, params));
}

export function useFetchOrganizationTree(tenantIds: number[], roleId = 0, tenantName?: string) {
  return useQuery(queryOptions.organizationTree(tenantIds, roleId, tenantName));
}

export function useFetchCustomGroupsTree(roleId = 0, userGroupName?: string) {
  return useQuery(queryOptions.customGroupsTree(roleId, userGroupName));
}

export function useFetchUserGroupDetail(userGroupId: number) {
  return useQuery(queryOptions.userGroupManualDetail(userGroupId));
}

export function useCreateUserGroupManual(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...userGroupManualOptions.create(),
    onSuccess: async (data: any, variables, context) => {
      // 공통 메세지 처리 등...
      queryClient.invalidateQueries({ queryKey: queryKeys.userGroupManualList });
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

export function useUpdateUserGroupManual(options: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...userGroupManualOptions.update(),
    onSuccess: async (data: any, variables, context) => {
      // 공통 메세지 처리 등...
      queryClient.invalidateQueries({ queryKey: queryKeys.userGroupManualDetail });
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
