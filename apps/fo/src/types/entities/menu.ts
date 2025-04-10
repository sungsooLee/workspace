import { Hierarchy } from '../hierarchy';

export interface Menu extends Hierarchy<Menu> {
  menuId: number;
  menuCode: string;
  menuName: string;
  path: string;
  sortOrder: number;
  quickAccessAreaYn: boolean;
  useYn: boolean;
  personalDataContainYn: boolean;
  visibleMobileYn: boolean;
  visiblePcYn: boolean;
  menuScope: string;
  menuDesc: string;
  hiddenYn: boolean;
  parentId: number;
  children?: Menu[];
}

export interface FetchMenusParams {
  roleIds?: string;
  tenantNo?: number;
}
