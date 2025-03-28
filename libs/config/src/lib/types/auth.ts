export interface AuthUser {
  userId: number;
  userTsid: string;
  employeeNumber: string;
  name: string;
  companyId: number;
  companyCode: string;
  emailAddress: string;
  tenants: Tenant[];
  tenantIds: number[];
  stateCode: string;
  locale: string;
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  activeTenantId?: number;
  mainTenantId?: number;
  menus?: any;
}

export interface AuthSSOHealthcheck {
  clientId: string;
  redirectUri: string;
  state: string;
}

export interface AuthSSOLogin {
  state: string;
  authorizationCode: string;
  timezone: string;
}

export interface Tenant {
  tenantId: number;
  tenantName: string;
}
