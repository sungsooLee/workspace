/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_tenant_dto_req_TenantUpdateReqDto = {
    /**
     * 테넌트 ID
     */
    tenantId?: number;
    /**
     * 테넌트명
     */
    tenantName?: string;
    /**
     * 테넌트로고 URL
     */
    logoImageUrl?: string;
    /**
     * 테넌트담당자목록
     */
    tenantMappingRoleList?: Array<number>;
    /**
     * 테넌트담당자목록(유저)
     */
    tenantMappingUserList?: Array<number>;
    /**
     * 테넌트정산태그
     */
    tenantBillingTag?: string;
    /**
     * 테넌트회사목록
     */
    companyTenantList?: Array<number>;
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
    tenantMappingLanguageTypeList?: Array<'zh' | 'es' | 'en' | 'hi' | 'ar' | 'bn' | 'pt' | 'ru' | 'ja' | 'de' | 'fr' | 'ur' | 'id' | 'vi' | 'ko' | 'it' | 'tr' | 'fa' | 'pl' | 'nl' | 'th' | 'ms' | 'ro' | 'he' | 'uk' | 'hu' | 'cs' | 'el'>;
};

