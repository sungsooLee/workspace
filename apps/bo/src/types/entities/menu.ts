import { Hierarchy } from '@learnway/shared';

export interface Menu extends Hierarchy<Menu> {
  menuId: number;
  menuCode: string;
  path: string;
  sortOrder: number;
  quickAccessAreaYn: boolean;
  useYn: boolean;
  personalDataContainYn: boolean;
  visibleMobileYn: boolean;
  visiblePcYn: boolean;
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
