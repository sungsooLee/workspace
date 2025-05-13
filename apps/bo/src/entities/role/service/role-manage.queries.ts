import { Role } from '../../../types/entities/role';
import RoleManagerService from '../api/role-manager';

export const roleQueryKeys = {
  all: ['role-manager-all'] as const,
  roles: ['roles'] as const,
  menus: ['menus'] as const,
  apis: ['apis'] as const,
  tree: ['tree'] as const,
};

export const roleManagerQueryOptions = {
  // 모든 역할 목록 트리 조회
  allRoles: (tenantId: number, siteScope: string) => ({
    queryKey: [...roleQueryKeys.all, ...roleQueryKeys.roles],
    queryFn: async () => RoleManagerService.fetchRoles(tenantId, siteScope),
  }),

  // 특정 역할 조회
  getRole: (roleId: string) => ({
    queryKey: [...roleQueryKeys.all, ...roleQueryKeys.roles, roleId],
    queryFn: async () => RoleManagerService.fetchRole(roleId),
    enabled: !!roleId,
  }),

  // 모든 메뉴 목록 트리 조회
  allMenus: () => ({
    queryKey: [...roleQueryKeys.all, ...roleQueryKeys.menus],
    queryFn: async () => RoleManagerService.fetchMenus(),
  }),

  // 역할에 할당된 메뉴 목록 조회
  getRoleMenus: (roleId: string) => ({
    queryKey: [...roleQueryKeys.all, ...roleQueryKeys.roles, roleId, ...roleQueryKeys.menus],
    queryFn: async () => RoleManagerService.fetchRoleMenus(roleId),
    enabled: !!roleId,
  }),

  // 메뉴에 속한 API 목록 조회
  getMenuApis: (menuId: string) => ({
    queryKey: [...roleQueryKeys.all, ...roleQueryKeys.menus, menuId, ...roleQueryKeys.apis],
    queryFn: async () => RoleManagerService.fetchMenuApis(menuId),
    enabled: !!menuId,
  }),

  // 역할에 할당된 API 목록 조회
  getRoleApis: (roleId: string) => ({
    queryKey: [...roleQueryKeys.all, ...roleQueryKeys.roles, roleId, ...roleQueryKeys.apis],
    queryFn: async () => RoleManagerService.fetchRoleApis(roleId),
    enabled: !!roleId,
  }),
  // 역할 트리 조회
  getRoleTree: (tenantId: number, siteScope: string) => ({
    queryKey: [roleQueryKeys.all, roleQueryKeys.tree, tenantId, siteScope],
    queryFn: async () => RoleManagerService.fetchRoleTree(tenantId, siteScope),
  }),
};

export const roleMutateOptions = {
  // 역할 생성
  createRole: () => ({
    mutationFn: (payload: Role) => RoleManagerService.createRole(payload),
  }),

  // 역할 삭제
  deleteRole: () => ({
    mutationFn: (roleId: string) => RoleManagerService.deleteRole(roleId),
  }),

  // 역할 수정
  updateRole: () => ({
    mutationFn: (payload: Role) => RoleManagerService.updateRole(payload),
  }),

  // 역할에 메뉴 할당
  assignMenusToRole: () => ({
    mutationFn: ({ roleId, menuIds }: { roleId: string; menuIds: string[] }) =>
      RoleManagerService.assignMenusToRole(roleId, menuIds),
  }),

  // 역할에 API 할당
  assignApisToRole: () => ({
    mutationFn: ({ roleId, apiIds }: { roleId: string; apiIds: string[] }) =>
      RoleManagerService.assignApisToRole(roleId, apiIds),
  }),
};
