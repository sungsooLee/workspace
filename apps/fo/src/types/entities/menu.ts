import { Hierarchy } from '../hierarchy';

export interface Menu extends Hierarchy<Menu> {
  id?: number;
  isQuickAccessArea?: boolean;
  roles?: string;
  tenantName?: string; // 제거 예정
}

export interface FetchMenusParams {
  roleIds?: string;
  tenantNo?: number;
}
