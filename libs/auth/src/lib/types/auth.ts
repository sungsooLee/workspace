export interface AuthUser {
  userId: number;
  employeeNumber: string;
  name: string;
  birthday: number;
  companyId: number;
  companyCode: string;
  email: string;
  phoneNumber: string;
  locale: string;
  passwordChangeDate: string;
  passwordExpireDate: string;
  stateCode: string;
  tenants: Tenant[];
  roles: Role[];
  enabled: boolean;
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  // fe custom spec
  activeTenant?: Tenant;
  activeRole?: Role;
  mainTenantId?: number;
  menus?: any;
  avataImage?: string;
  latestLoginDatetime?: Date;
  phoneNumberNationCode?: string;

  lastVisitedBoRoleId: number | null;
  lastVisitedBoTenantId: number | null;
  lastVisitedFoRoleId: number | null;
  lastVisitedFoTenantId: number | null;
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
  logoImageUrl?: string;
}
export interface Role {
  roleId: number;
  roleName: string;
  tenantId: number;
}

export type AUTH_TOOL_TYPE = 'PHONE' | 'EMAIL';
export type MEMBER_TYPE = 'GENERAL' | 'HTA';
