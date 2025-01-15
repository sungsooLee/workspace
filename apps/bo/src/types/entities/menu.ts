export interface Hierarchy<T> {
  key: string;
  title: string;
  path: string;
  children?: Hierarchy<T>[];
  parentNode: Menu;
  depth: number;
}

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
