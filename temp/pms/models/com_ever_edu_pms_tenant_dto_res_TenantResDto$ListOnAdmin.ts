/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_tenant_dto_res_TenantResDto$CompanyResDto } from './com_ever_edu_pms_tenant_dto_res_TenantResDto$CompanyResDto';
import type { com_ever_edu_pms_tenant_dto_res_TenantResDto$UserResDto } from './com_ever_edu_pms_tenant_dto_res_TenantResDto$UserResDto';
export type com_ever_edu_pms_tenant_dto_res_TenantResDto$ListOnAdmin = {
    tenantId?: number;
    tenantName?: string;
    tenantSite?: string;
    isSecurityPledge?: boolean;
    fileStorageTypeChannel?: com_ever_edu_pms_tenant_dto_res_TenantResDto$ListOnAdmin.fileStorageTypeChannel;
    fileStorageTypeBase?: com_ever_edu_pms_tenant_dto_res_TenantResDto$ListOnAdmin.fileStorageTypeBase;
    isUsed?: boolean;
    tenantUserList?: Array<com_ever_edu_pms_tenant_dto_res_TenantResDto$UserResDto>;
    companyTenantList?: Array<com_ever_edu_pms_tenant_dto_res_TenantResDto$CompanyResDto>;
    createdBy?: string;
    createdDate?: string;
    lastModifiedBy?: string;
    modifiedDate?: string;
};
export namespace com_ever_edu_pms_tenant_dto_res_TenantResDto$ListOnAdmin {
    export enum fileStorageTypeChannel {
        AWS_INTERNAL = 'AWS_INTERNAL',
        AWS_EXTERNAL = 'AWS_EXTERNAL',
        HMG_CLOUD = 'HMG_CLOUD',
    }
    export enum fileStorageTypeBase {
        AWS_INTERNAL = 'AWS_INTERNAL',
        AWS_EXTERNAL = 'AWS_EXTERNAL',
        HMG_CLOUD = 'HMG_CLOUD',
    }
}

