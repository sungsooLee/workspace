/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 로그인 제한 정보
 */
export type com_ever_edu_pms_company_dto_res_CompanyLoginRestrictionResDto = {
    /**
     * 회사로그인제한정보 ID
     */
    companyLoginRestrictionId?: number;
    /**
     * 로그인 제한명
     */
    loginRestrictionName?: string;
    /**
     * 로그인 제한 구분
     */
    loginRestrictionType?: com_ever_edu_pms_company_dto_res_CompanyLoginRestrictionResDto.loginRestrictionType;
    /**
     * 로그인 제한 설정 방식
     */
    loginRestrictionSettingType?: com_ever_edu_pms_company_dto_res_CompanyLoginRestrictionResDto.loginRestrictionSettingType;
    /**
     * 제한시작일(yyyyMMdd)
     */
    restrictionStrDate?: string;
    /**
     * 제한종료일(yyyyMMdd)
     */
    restrictionEndDate?: string;
    /**
     * 사용여부
     */
    isUsed?: boolean;
    /**
     * 등록자ID
     */
    createdBy?: string;
    /**
     * 등록일시
     */
    createdDate?: string;
    /**
     * 최종수정자ID
     */
    lastModifiedBy?: string;
    /**
     * 최종수정일시
     */
    modifiedDate?: string;
};
export namespace com_ever_edu_pms_company_dto_res_CompanyLoginRestrictionResDto {
    /**
     * 로그인 제한 구분
     */
    export enum loginRestrictionType {
        LOGIN_RESTRICTION_TYPE_A = 'LOGIN_RESTRICTION_TYPE_A',
        LOGIN_RESTRICTION_TYPE_B = 'LOGIN_RESTRICTION_TYPE_B',
    }
    /**
     * 로그인 제한 설정 방식
     */
    export enum loginRestrictionSettingType {
        LOGIN_RESTRICTION_SETTING_TYPE_A = 'LOGIN_RESTRICTION_SETTING_TYPE_A',
        LOGIN_RESTRICTION_SETTING_TYPE_B = 'LOGIN_RESTRICTION_SETTING_TYPE_B',
    }
}

