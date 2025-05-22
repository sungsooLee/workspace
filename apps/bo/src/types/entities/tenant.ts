export interface Tenant {
  tenantId: number;
  tenantName: string;
  logoImageUrl: string;
  tenantRoleList: TenantRole[];
  tenantBillingTag: string;
  companyTenantList: TenantCompany[];
  isUsed: boolean;
  tenantDesc: string;
  isPc: boolean;
  isMobile: boolean;
  isApp: boolean;
  isCommonCategory: boolean;
  isTenantCategory: boolean;
  tenantLanguageList: string[];
  tenantUserList: any[];
}

export interface TenantRole {
  tenantId: number;
  roleId: number;
  roleCode: string;
  roleName: string;
}

export interface TenantCompany {
  tenantId: number;
  companyId: number;
  companyCode: string;
  companyName: string;
}
