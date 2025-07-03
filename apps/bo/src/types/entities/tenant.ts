export interface Tenant {
  tenantId: number;
  tenantSite: string;
  tenantName: string;
  logoImageUrl: string;
  tenantUserList: any[];
  tenantTagList: TenantTag[];
  companyTenantList: TenantCompany[];
  isUsed: boolean;
  tenantDesc: string;
  isPc: boolean;
  isMobile: boolean;
  isApp: boolean;
  isCommonCategory: boolean;
  isTenantCategory: boolean;
  langCountryCodeTypeList: string[];
  createdBy: string;
  createdDate: Date;
  lastModifiedBy: string;
  modifiedDate: Date;
}

export interface TenantTag {
  tagName: string;
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
