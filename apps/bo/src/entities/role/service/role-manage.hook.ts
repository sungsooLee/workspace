import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  roleQueryKeys,
  roleManagerQueryOptions as queryOptions,
  roleMutateOptions as mutateOptions,
} from './role-manage.queries';
import { useModal } from '@learnway/ui';

export function useFetchRole(roleCode: string) {
  return useQuery({ ...queryOptions.getRole(roleCode), enabled: !!roleCode });
}

export function useFetchRoleMenus(tenantId: number, siteScope: string, roleCode: string) {
  return useQuery({
    ...queryOptions.getRoleMenus(tenantId, siteScope, roleCode),
    enabled: !!roleCode,
  });
}

export function useFetchMenuApis(roleCode: string, menuId: string) {
  return useQuery({
    ...queryOptions.getMenuApis(roleCode, menuId),
    enabled: !!roleCode && !!menuId,
  });
}

export function useGetRoleUserGroups(roleCode: string) {
  return useQuery({
    ...queryOptions.getRoleUserGroups(roleCode),
  });
}

export function useFetchRoleTree(tenantId: number, siteScope: string) {
  return useQuery({ ...queryOptions.getRoleTree(tenantId, siteScope) });
}

export function useModifyMenusAndApiToRole(options: any) {
  const mutation = useMutation({
    ...mutateOptions.modifyMenusAndApiToRole(),
    onSuccess: async (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
  return {
    createAndRemve: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useMovePosition(options: any) {
  const mutation = useMutation({
    ...mutateOptions.movePosition(),
    onSuccess: async (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
  return {
    updatePosition: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useSaveUsers(options: any) {
  const mutation = useMutation({
    ...mutateOptions.modifyUserToRole(),
    onSuccess: async (data, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
  return {
    saveUsersRole: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

// 실제 API를 사용하는 훅
interface RoleHookOptions {
  onRoleCreateSuccess?: (data: any, variables: any, context: any) => void;
  onRoleUpdateSuccess?: (data: any, variables: any, context: any) => void;
  onRoleDeleteSuccess?: (data: any, variables: any, context: any) => void;
}

export const useRoleManager = (options: RoleHookOptions = {}) => {
  const queryClient = useQueryClient();
  const { showSaveComplete, showDeleteComplete, showUpdateComplete } = useModal();

  // 역할 생성
  const { mutate: createRoleMutate } = useMutation({
    ...mutateOptions.createRole(),
    onSuccess: async (data, variables, context) => {
      showSaveComplete();
      await queryClient.invalidateQueries({
        queryKey: [...roleQueryKeys.all, ...roleQueryKeys.roles],
      });
      if (options.onRoleCreateSuccess) {
        options.onRoleCreateSuccess(data, variables, context);
      }
    },
  });

  // 역할 삭제
  const { mutate: deleteRoleMutate } = useMutation({
    ...mutateOptions.deleteRole(),
    onSuccess: async (data, variables, context) => {
      showDeleteComplete();
      await queryClient.invalidateQueries({
        queryKey: [...roleQueryKeys.all, ...roleQueryKeys.roles],
      });
      if (options.onRoleDeleteSuccess) {
        options.onRoleDeleteSuccess(data, variables, context);
      }
    },
  });

  // 역할 수정
  const { mutate: updateRoleMutate } = useMutation({
    ...mutateOptions.updateRole(),
    onSuccess: async (data, variables, context) => {
      showUpdateComplete();
      await queryClient.invalidateQueries({
        queryKey: [...roleQueryKeys.all, ...roleQueryKeys.roles],
      });
      if (options.onRoleUpdateSuccess) {
        options.onRoleUpdateSuccess(data, variables, context);
      }
    },
  });

  // 핸들러 함수들
  const handleCreateRole = (roleData: any, callbacks?: any) => {
    createRoleMutate(roleData, callbacks);
  };

  const handleDeleteRole = (roleCode: string, callbacks?: any) => {
    deleteRoleMutate(roleCode, callbacks);
  };

  const handleUpdateRole = (roleData: any, callbacks?: any) => {
    updateRoleMutate(roleData, callbacks);
  };

  return {
    createRole: handleCreateRole,
    deleteRole: handleDeleteRole,
    updateRole: handleUpdateRole,
  };
};
