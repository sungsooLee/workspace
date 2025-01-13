export interface Hierarchy<T> {
  title: string;
  path: string;
  children?: T[];
}

export interface MenuHierarchy extends Hierarchy<MenuHierarchy> {
  id?: number;
  isQuickAccessArea?: boolean;
  roles?: string;
  tenantName?: string; // 제거 예정
}

export interface Menu extends Hierarchy<MenuHierarchy> {
  parentNode: Menu;
  depth: number;
}

export interface FetchMenusParams {
  parentMenuId?: number;
  roleIds?: string;
  tenantId?: number;
}
