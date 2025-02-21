export interface AuthUser {
  userId: string;
  userTsId: string;
  tenantIds: number[];
  activeTenantId: number;
  locale?: string;
  email?: string;
  menus?: any;
}
