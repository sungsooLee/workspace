/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_tenant_dto_req_TenantReqDto$CompanyReqDto } from './com_ever_edu_pms_tenant_dto_req_TenantReqDto$CompanyReqDto';
import type { com_ever_edu_pms_tenant_dto_req_TenantReqDto$TagReqDto } from './com_ever_edu_pms_tenant_dto_req_TenantReqDto$TagReqDto';
import type { com_ever_edu_pms_tenant_dto_req_TenantReqDto$UserReqDto } from './com_ever_edu_pms_tenant_dto_req_TenantReqDto$UserReqDto';
export type com_ever_edu_pms_tenant_dto_req_TenantCreateReqDto = {
    /**
     * 테넌트명
     */
    tenantName?: string;
    /**
     * 테넌트로고 URL
     */
    logoImageUrl?: string;
    /**
     * 테넌트담당자목록(유저)
     */
    tenantUserList?: Array<com_ever_edu_pms_tenant_dto_req_TenantReqDto$UserReqDto>;
    /**
     * 테넌트태그
     */
    tenantTagList?: Array<com_ever_edu_pms_tenant_dto_req_TenantReqDto$TagReqDto>;
    /**
     * 테넌트회사목록
     */
    companyTenantList?: Array<com_ever_edu_pms_tenant_dto_req_TenantReqDto$CompanyReqDto>;
    /**
     * 보안서약여부
     */
    isSecurityPledge?: boolean;
    /**
     * 파일 저장 설정(채널)
     */
    fileStorageTypeChannel: com_ever_edu_pms_tenant_dto_req_TenantCreateReqDto.fileStorageTypeChannel;
    /**
     * 파일 저장 설정(기본)
     */
    fileStorageTypeBase: com_ever_edu_pms_tenant_dto_req_TenantCreateReqDto.fileStorageTypeBase;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    /**
     * 테넌트설명
     */
    tenantDesc?: string;
    /**
     * 디바이스 PC
     */
    isPc?: boolean;
    /**
     * 디바이스 MOBILE
     */
    isMobile?: boolean;
    /**
     * 디바이스 APP
     */
    isApp?: boolean;
    /**
     * 공통카테고리
     */
    isCommonCategory?: boolean;
    /**
     * 테넌트카테고리
     */
    isTenantCategory?: boolean;
    /**
     * 언어
     */
    langCountryCodeTypeList?: Array<'KO' | 'EN' | 'ES' | 'AR' | 'RU' | 'FR' | 'PT' | 'ID' | 'ZH' | 'VI' | 'TR' | 'TH' | 'DE' | 'HE' | 'NE' | 'FA' | 'HI' | 'JA' | 'MS' | 'IT' | 'SK' | 'RO' | 'HR' | 'ET'>;
};
export namespace com_ever_edu_pms_tenant_dto_req_TenantCreateReqDto {
    /**
     * 파일 저장 설정(채널)
     */
    export enum fileStorageTypeChannel {
        AWS_INTERNAL = 'AWS_INTERNAL',
        AWS_EXTERNAL = 'AWS_EXTERNAL',
        HMG_CLOUD = 'HMG_CLOUD',
    }
    /**
     * 파일 저장 설정(기본)
     */
    export enum fileStorageTypeBase {
        AWS_INTERNAL = 'AWS_INTERNAL',
        AWS_EXTERNAL = 'AWS_EXTERNAL',
        HMG_CLOUD = 'HMG_CLOUD',
    }
}

