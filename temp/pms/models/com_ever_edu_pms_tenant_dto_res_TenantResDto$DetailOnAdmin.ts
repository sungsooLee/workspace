/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_tenant_dto_res_TenantResDto$CompanyResDto } from './com_ever_edu_pms_tenant_dto_res_TenantResDto$CompanyResDto';
import type { com_ever_edu_pms_tenant_dto_res_TenantResDto$RoleResDto } from './com_ever_edu_pms_tenant_dto_res_TenantResDto$RoleResDto';
import type { com_ever_edu_pms_tenant_dto_res_TenantResDto$UserResDto } from './com_ever_edu_pms_tenant_dto_res_TenantResDto$UserResDto';
export type com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin = {
    tenantId?: number;
    tenantName?: string;
    logoImageUrl?: string;
    tenantRoleList?: Array<com_ever_edu_pms_tenant_dto_res_TenantResDto$RoleResDto>;
    tenantUserList?: Array<com_ever_edu_pms_tenant_dto_res_TenantResDto$UserResDto>;
    tenantBillingTag?: string;
    companyTenantList?: Array<com_ever_edu_pms_tenant_dto_res_TenantResDto$CompanyResDto>;
    isUsed?: boolean;
    tenantDesc?: string;
    isPc?: boolean;
    isMobile?: boolean;
    isApp?: boolean;
    isCommonCategory?: boolean;
    isTenantCategory?: boolean;
    tenantLanguageList?: Array<'zh' | 'es' | 'en' | 'hi' | 'ar' | 'bn' | 'pt' | 'ru' | 'ja' | 'de' | 'fr' | 'ur' | 'id' | 'vi' | 'ko' | 'it' | 'tr' | 'fa' | 'pl' | 'nl' | 'th' | 'ms' | 'ro' | 'he' | 'uk' | 'hu' | 'cs' | 'el'>;
};

