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
  children: Menu[];
}

export interface FetchMenusParams {
  parentMenuId?: number;
  roleIds?: string;
  tenantId?: number;
}
