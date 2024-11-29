export interface Menu {
  id: number;
  title: string;
  path: string;
  roles?: string;
  children?: Menu[];
}

export interface FetchMenusParams {
  parentMenuId?: number;
  roleIds?: string;
  tenantId?: number;
}
