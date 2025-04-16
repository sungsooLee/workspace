import MenuMangeService from '../api/menu-manage';

export const queryKeys = {
  all: ['menu-manger-all'] as const,
  tree: () => [...queryKeys.all] as const,
  detail: (menuId: string) => ['menuId', menuId] as const,
};

export const menuManageQueryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: async () => MenuMangeService.fetchMenus(),
    cacheTime: 0,
    staleTime: 0,
    enabled: false,
  }),
  //메뉴 목록 조회
  tree: (menuScopeCode: string, locale: string) => ({
    queryKey: [...queryKeys.tree(), menuScopeCode],
    queryFn: () => MenuMangeService.fetchMenuTree(menuScopeCode, locale),
    cacheTime: 0,
    staleTime: 0,
  }),
  //메뉴 단건 조회
  detail: (menuId: string) => ({
    queryKey: queryKeys.detail(menuId),
    queryFn: () => MenuMangeService.fetchMenuDetail(menuId),
  }),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: any) => MenuMangeService.createMenu(payload),
  }),
  checkExistsMenu: () => ({
    mutationFn: (payload: any) => MenuMangeService.existsMenu(payload.menuCode, payload.parentId),
  }),
  updateMenu: () => ({
    mutationFn: (payload: any) => MenuMangeService.updateMenu(payload),
  }),
  deleteMenu: () => ({
    mutationFn: (payload: any) => MenuMangeService.deleteMenu(payload),
  }),
  moveMenu: () => ({
    mutationFn: (payload: any) => MenuMangeService.moveMenu(payload),
  }),
};
