import { Role } from '../../../types/entities/role';
import RoleManagerService from '../api/role-manager';
import TenantMenuManageService from '@entities/tenant/api/menu-tenant-manage';
import MenuMangerService from '@entities/menu/api/menu-manage';

export const roleQueryKeys = {
  all: ['role-manager-all'] as const,
  roles: ['roles'] as const,
  menus: ['menus'] as const,
  apis: ['apis'] as const,
  tree: ['tree'] as const,
};

const genRoleMenuTree = (menus: any[], roleMenu: any, contains: any[] = []) => {
  for (const menu of menus) {
    if (roleMenu.get(menu.menuId)) {
      contains.push(menu);
      if (menu.children && menu.children.length > 0) {
        const children = genRoleMenuTree(menu.children, roleMenu);
        menu.children = children;
      }
    }
  }
  return contains;
};

export const roleManagerQueryOptions = {
  // 모든 역할 목록 트리 조회
  allRoles: (tenantId: number, siteScope: string) => ({
    queryKey: [...roleQueryKeys.all, ...roleQueryKeys.roles],
    queryFn: async () => RoleManagerService.fetchRoles(tenantId, siteScope),
  }),

  // 특정 역할 조회
  getRole: (roleCode: string) => ({
    queryKey: [...roleQueryKeys.all, ...roleQueryKeys.roles, roleCode],
    queryFn: async () => RoleManagerService.fetchRole(roleCode),
    enabled: !!roleCode,
  }),

  // 역할에 할당된 메뉴 목록 조회
  getRoleMenus: (tenantId: number, siteScope: string, roleCode: string) => ({
    queryKey: [...roleQueryKeys.all, ...roleQueryKeys.roles, roleCode, ...roleQueryKeys.menus],
    queryFn: async () => {
      const menuTreePromise = TenantMenuManageService.findMenuTenantMappingTree(
        tenantId,
        siteScope,
      );
      const roleMenus = await RoleManagerService.fetchRoleMenus(roleCode);
      const roleMap = new Map();
      roleMenus.forEach((item: any) => {
        roleMap.set(item.menuId, item);
      });

      const menuData = await menuTreePromise;
      console.log(menuData);
      const rootMenu: any = { ...menuData };
      rootMenu.children = genRoleMenuTree(menuData.children, roleMap);

      return rootMenu;
    },
    enabled: !!roleCode,
  }),

  // 메뉴에 속한 API 목록 조회
  getMenuApis: (roleCode: string, menuId: string) => ({
    queryKey: [...roleQueryKeys.all, ...roleQueryKeys.menus, menuId, ...roleQueryKeys.apis],
    queryFn: async () => {
      const menuDetailPromise = MenuMangerService.fetchMenuDetail(menuId);
      const roleMenuApi: any[] = await RoleManagerService.fetchRoleMenuApis(roleCode, menuId);
      const menuDetail = await menuDetailPromise;
      const roleMenuApiMap = new Map();
      for (const item of roleMenuApi) {
        roleMenuApiMap.set(item.apiId, item);
      }
      return {
        roleMenuApiList: [...roleMenuApiMap.keys()],
        apiMappingMenuList: menuDetail.apiMappingMenuList,
      };
    },
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
  // getRoleMenuTree: async (tenantId: number, siteScope: string, roleCode: string) => {
  //   const menuTree = TenantMenuManageService.findMenuTenantMappingTree(tenantId, siteScope);
  //   const roleMenus = await RoleManagerService.fetchRoleMenus(roleCode);
  //   const roleMap = new Map();
  //   roleMenus.forEach((item: any) => {
  //     roleMap.set(item.menuId, item);
  //   });

  //   menuTree.then((data) => {
  //     const rootMenu = [{ data }];
  //   });
  // },
};

export const roleMutateOptions = {
  // 역할 생성
  createRole: () => ({
    mutationFn: (payload: Role) => RoleManagerService.createRole(payload),
  }),

  // 역할 삭제
  deleteRole: () => ({
    mutationFn: (roleCode: string) => RoleManagerService.deleteRole(roleCode),
  }),

  // 역할 수정
  updateRole: () => ({
    mutationFn: (payload: Role) => RoleManagerService.updateRole(payload),
  }),

  // 역할에 메뉴 할당
  modifyMenusAndApiToRole: () => ({
    mutationFn: ({ roleCode, body }: { roleCode: string; body: any }) =>
      RoleManagerService.modifyMenusAndApiToRole(roleCode, body),
  }),
};
