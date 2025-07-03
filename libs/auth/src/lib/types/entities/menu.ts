// import { Hierarchy } from '@learnway/shared';

type Hierarchy<T> = T & {
  children?: Hierarchy<T>[];
  key: string;
  title: string;
  path: string;
  parentNode: T;
  depth: number;
};

interface MenuItem {
  menuId: number;
  menuCode: string;
  path: string;
  sortOrder: number;
  isShortCutArea: boolean;
  isUsed: boolean;
  isPersoninfoInclusion: boolean;
  isMobileExposed: boolean;
  isWebExposed: boolean;
  menuScope: 'FO' | 'BO' | 'EX';
  menuDesc: string;
  hiddenYn: boolean;
  parentId: number;
  menuName: string;
  isHiddenMenu: boolean;
  isFavorite: boolean;
  tenantId: number;
  tenantMappingMenuId: number;
  depth: number;
}

export type Menu = Hierarchy<MenuItem>;

export interface FetchMenusParams {
  roleIds?: string;
  tenantId?: number;
}
