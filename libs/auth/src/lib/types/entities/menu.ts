import { Hierarchy } from '@learnway/shared';

export interface Menu extends Hierarchy<Menu> {
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

export interface FetchMenusParams {
  roleIds?: string;
  tenantId?: number;
}
