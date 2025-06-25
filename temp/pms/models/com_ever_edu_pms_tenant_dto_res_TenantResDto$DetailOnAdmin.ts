/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_tenant_dto_res_TenantResDto$CompanyResDto } from './com_ever_edu_pms_tenant_dto_res_TenantResDto$CompanyResDto';
import type { com_ever_edu_pms_tenant_dto_res_TenantResDto$TagResDto } from './com_ever_edu_pms_tenant_dto_res_TenantResDto$TagResDto';
import type { com_ever_edu_pms_tenant_dto_res_TenantResDto$UserResDto } from './com_ever_edu_pms_tenant_dto_res_TenantResDto$UserResDto';
export type com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin = {
    tenantId?: number;
    tenantName?: string;
    logoImageUrl?: string;
    tenantUserList?: Array<com_ever_edu_pms_tenant_dto_res_TenantResDto$UserResDto>;
    tenantTagList?: Array<com_ever_edu_pms_tenant_dto_res_TenantResDto$TagResDto>;
    companyTenantList?: Array<com_ever_edu_pms_tenant_dto_res_TenantResDto$CompanyResDto>;
    isSecurityPledge?: boolean;
    fileStorageTypeChannel?: com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin.fileStorageTypeChannel;
    fileStorageTypeBase?: com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin.fileStorageTypeBase;
    isUsed?: boolean;
    tenantDesc?: string;
    isPc?: boolean;
    isMobile?: boolean;
    isApp?: boolean;
    isCommonCategory?: boolean;
    isTenantCategory?: boolean;
    langCountryCodeTypeList?: Array<'KO' | 'EN' | 'ES' | 'AR' | 'RU' | 'FR' | 'PT' | 'ID' | 'ZH' | 'VI' | 'TR' | 'TH' | 'DE' | 'HE' | 'NE' | 'FA' | 'HI' | 'JA' | 'MS' | 'IT' | 'SK' | 'RO' | 'HR' | 'ET'>;
};
export namespace com_ever_edu_pms_tenant_dto_res_TenantResDto$DetailOnAdmin {
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

