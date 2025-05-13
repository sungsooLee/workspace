/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_tenant_dto_res_TenantResDto$CompanyResDto } from './com_ever_edu_pms_tenant_dto_res_TenantResDto$CompanyResDto';
import type { com_ever_edu_pms_tenant_dto_res_TenantResDto$RoleResDto } from './com_ever_edu_pms_tenant_dto_res_TenantResDto$RoleResDto';
export type com_ever_edu_pms_tenant_dto_res_TenantResDto$ListOnAdmin = {
    tenantId?: number;
    tenantName?: string;
    tenantSite?: string;
    isUsed?: boolean;
    companyTenantList?: Array<com_ever_edu_pms_tenant_dto_res_TenantResDto$CompanyResDto>;
    tenantRoleList?: Array<com_ever_edu_pms_tenant_dto_res_TenantResDto$RoleResDto>;
    createdBy?: string;
    createdDate?: string;
    lastModifiedBy?: string;
    modifiedDate?: string;
    tenantMappingRoleNameList?: Array<com_ever_edu_pms_tenant_dto_res_TenantResDto$RoleResDto>;
};

