/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_tenant_dto_res_TenantResDto$CompanyResDto } from './com_ever_edu_pms_tenant_dto_res_TenantResDto$CompanyResDto';
import type { com_ever_edu_pms_tenant_dto_res_TenantResDto$RoleResDto } from './com_ever_edu_pms_tenant_dto_res_TenantResDto$RoleResDto';
export type com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin = {
    tenantId?: number;
    tenantName?: string;
    logoImageUrl?: string;
    tenantRoleList?: Array<com_ever_edu_pms_tenant_dto_res_TenantResDto$RoleResDto>;
    tenantBillingTag?: string;
    companyTenantList?: Array<com_ever_edu_pms_tenant_dto_res_TenantResDto$CompanyResDto>;
    isUsed?: boolean;
    tenantDesc?: string;
    isPc?: boolean;
    isMobile?: boolean;
    isApp?: boolean;
    isCommonCategory?: boolean;
    isTenantCategory?: boolean;
    tenantMappingRoleNameList?: Array<com_ever_edu_pms_tenant_dto_res_TenantResDto$RoleResDto>;
};

