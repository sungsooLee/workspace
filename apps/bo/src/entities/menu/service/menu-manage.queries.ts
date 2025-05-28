import { keepPreviousData } from '@tanstack/react-query';
import MenuMangeService from '../api/menu-manage';

export const queryKeys = {
  all: ['menu-manger-all'] as const,
  allFavorites: ['menu-favorites-all'] as const,
  tree: () => [...queryKeys.all] as const,
  menuTree: (menuScope?: string, locale?: string) =>
    [...queryKeys.all, 'tree', menuScope, locale] as const,
  detail: (menuId: string) => ['menuId', menuId] as const,
  checkDuplicate: (menuScopeCode: string, menuCode: string) =>
    ['checkDuplicate', menuScopeCode, menuCode] as const,
};

export const menuManageQueryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: async () => MenuMangeService.fetchMenus(),
    cacheTime: 0,
    staleTime: 0,
    enabled: false,
  }),
  // 즐겨찾기 목록 조회
  allFavorites: (payload: any) => ({
    queryKey: queryKeys.allFavorites,
    queryFn: async () => MenuMangeService.fetchMenuFavorites(payload),
    cacheTime: 0,
    staleTime: 0,
    enabled: !!payload?.tenantId && !!payload?.userNo,
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
    placeholder: keepPreviousData,
  }),
};

export const mutateOptions = {
  // create: () => ({
  //   mutationFn: (payload: any) => MenuMangeService.createMenu(payload),
  // }),
  // checkExistsMenu: () => ({
  //   mutationFn: (payload: any) =>
  //     MenuMangeService.existsMenu(payload.menuScopeCode, payload.menuCode),
  // }),
  // updateMenu: () => ({
  //   mutationFn: (payload: any) => MenuMangeService.updateMenu(payload),
  // }),
  // deleteMenu: () => ({
  //   mutationFn: (payload: any) => MenuMangeService.deleteMenu(payload),
  // }),
  // moveMenu: () => ({
  //   mutationFn: (payload: any) => MenuMangeService.moveMenu(payload),
  // }),
  createFavorites: () => ({
    mutationFn: (payload: any) => MenuMangeService.createMenuFavorites(payload),
  }),
  deleteFavorites: () => ({
    mutationFn: (payload: any) => MenuMangeService.deleteMenuFavorites(payload),
  }),
  moveMenuFavorites: () => ({
    mutationFn: (payload: any) => MenuMangeService.moveMenuFavorites(payload),
  }),
};
