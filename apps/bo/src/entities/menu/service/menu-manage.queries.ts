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
    queryFn: async () => MenuMangeService.fetchMenuTree(menuScopeCode, locale),
  }),
  //메뉴 단건 조회
  detail: (menuId: string) => ({
    queryKey: queryKeys.detail(menuId),
    queryFn: () => MenuMangeService.fetchMenuDetail(menuId),
    placeholder: keepPreviousData,
    enabled: !!menuId,
  }),
  //메뉴 중복 확인
  checkDuplicate: (menuScopeCode: string, menuCode: string) => ({
    queryKey: queryKeys.checkDuplicate(menuScopeCode, menuCode),
    queryFn: () => MenuMangeService.existsMenu(menuScopeCode, menuCode),
    enabled: !!menuScopeCode && !!menuCode,
  }),
};

export const mutateOptions = {
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
