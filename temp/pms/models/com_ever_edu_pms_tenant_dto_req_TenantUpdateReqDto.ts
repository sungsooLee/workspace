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
    tenantMappingLanguageTypeList?: Array<'KO' | 'EN' | 'ZH' | 'JA' | 'ES' | 'FR' | 'DE' | 'IT' | 'PT' | 'RU' | 'AR' | 'HI' | 'BN' | 'UR' | 'ID' | 'MS' | 'TH' | 'VI' | 'TR' | 'NL' | 'SV' | 'NO' | 'DA' | 'FI' | 'PL' | 'CS' | 'SK' | 'HU' | 'RO' | 'BG' | 'HR' | 'SR' | 'SL' | 'LT' | 'LV' | 'ET' | 'EL' | 'HE' | 'FA' | 'SW' | 'AM' | 'HA' | 'YO' | 'IG' | 'ZU' | 'AF' | 'KA' | 'HY' | 'AZ' | 'KK' | 'KY' | 'UZ' | 'TK' | 'TG' | 'MN' | 'MY' | 'KM' | 'LO' | 'SI' | 'TA' | 'TE' | 'KN' | 'ML' | 'GU' | 'PA' | 'MR' | 'NE' | 'DZ' | 'BO' | 'EU' | 'CA' | 'GL' | 'CY' | 'GA' | 'GD' | 'IS' | 'FO' | 'MT' | 'SQ' | 'MK' | 'BE' | 'UK' | 'TI' | 'SO' | 'RW' | 'RN' | 'LG' | 'NY' | 'SN' | 'ST' | 'TN' | 'VE' | 'XH' | 'SS' | 'TS' | 'NR' | 'FIL' | 'TL' | 'CEB' | 'HIL' | 'WAR' | 'BCL' | 'PAM' | 'PAN' | 'ILO' | 'HAW' | 'MAO' | 'TON' | 'FJ' | 'SM' | 'CHM' | 'CV' | 'TT' | 'BA' | 'SAH' | 'BUA' | 'TUV'>;
};

