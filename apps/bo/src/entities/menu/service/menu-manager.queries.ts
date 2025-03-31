import MenuMangerService from '../api/menu-manager';

export const queryKeys = {
  all: ['menu-manger-all'] as const,
  tree: () => [...queryKeys.all] as const,
  detail: (menuId: string) => ['menuId', menuId] as const,
};

export const menuManagerQueryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: async () => MenuMangerService.fetchMenus(),
    cacheTime: 0,
    staleTime: 0,
    enabled: false,
  }),
  //메뉴 목록 조회
  tree: (menuScopeCode: string, locale: string) => ({
    queryKey: queryKeys.tree(),
    queryFn: () => MenuMangerService.fetchMenuTree(menuScopeCode, locale),
    cacheTime: 0,
    staleTime: 0,
  }),
  //메뉴 단건 조회
  detail: (menuId: string) => ({
    queryKey: queryKeys.detail(menuId),
    queryFn: () => MenuMangerService.fetchMenuDetail(menuId),
  }),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: any) => MenuMangerService.createMenu(payload),
  }),
  checkExistsMenu: () => ({
    mutationFn: (payload: any) => MenuMangerService.existsMenu(payload.menuCode, payload.parentId),
  }),
};
