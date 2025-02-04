import { Hierarchy } from '@learnway/shared';

export interface Menu extends Hierarchy<Menu> {
  id?: number;
  isQuickAccessArea?: boolean;
  roles?: string;
  tenantName?: string; // 제거 예정
}

export interface FetchMenusParams {
  parentMenuId?: number;
  roleIds?: string;
  tenantId?: number;
}
