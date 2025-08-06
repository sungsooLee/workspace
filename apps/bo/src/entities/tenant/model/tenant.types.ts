import { PageRequestParam } from '@shared/types/page-meta';

export interface Tenant {
  flatformProperties: {
    isUseEnrollOption: boolean;
    isUseTextBookOption: boolean;
    isUseInstructorOption: boolean;
    isUsePassOption: boolean;
    isUseCommunicationOption: boolean;
    isUseLearningEnvOption: boolean;
    isUseLearningControlOption: boolean;
    isUseRelatedCourseOption: boolean;
    isUseAdminDataOption: boolean;
    isUseCarTenantCustomOption: boolean;
    isUseRotemTenantCustomOption: boolean;
    isUseOutsourcingTenantCustomOption: boolean;
    isUseWiaTenantCustomOption: boolean;
    isUseAutoeverTenantCustomOption: boolean;
  };
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

// 테넌트 조회 ( 역할 기준 )
export interface TenantByRoleId {
  tenantId: number;
  tenantName: string;
  tenantSite: string;
  isSecurityPledge: boolean;
  fileStorageTypeChannelList: string[];
  fileStorageTypeBase: string;
  isUsed: boolean;
  tenantUserList: TenantUserList[];
  companyTenantList: CompanyTenantList[];
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  modifiedDate: string;
}

export interface TenantUserList {
  tenantId: number;
  userUuid: string;
  userName: string;
  deptName: string;
  companyName: string;
}

export interface CompanyTenantList {
  tenantId: number;
  companyId: number;
  companyCode: string;
  companyName: string;
  managerName: string;
}

export interface TenantSearchParam extends PageRequestParam {
  tenantId?: number;
  tenantName?: string;
  companyName?: string;
  companyCode?: string;
  tenantManagerName?: string;
  companyManagerName?: string;
  isUsed?: boolean;
}
