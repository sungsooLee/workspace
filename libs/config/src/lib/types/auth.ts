export interface AuthUser {
  userId: number;
  userTsid: string;
  employeeNumber: string;
  name: string;
  companyId: number;
  companyCode: string;
  emailAddress: string;
  tenantIds: number[];
  stateCode: string;
  locale: string;
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  activeTenantId?: number;
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
