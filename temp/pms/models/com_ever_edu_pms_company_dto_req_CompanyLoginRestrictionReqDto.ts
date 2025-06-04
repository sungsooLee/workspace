/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_company_dto_req_CompanyLoginRestrictionDetailReqDto } from './com_ever_edu_pms_company_dto_req_CompanyLoginRestrictionDetailReqDto';
/**
 * 회사로그인제한정보
 */
export type com_ever_edu_pms_company_dto_req_CompanyLoginRestrictionReqDto = {
    /**
     * 회사로그인제한정보 ID
     */
    companyLoginRestrictionId?: number;
    /**
     * 회사 ID
     */
    companyId?: number;
    /**
     * 로그인 제한 구분
     */
    loginRestrictionType?: com_ever_edu_pms_company_dto_req_CompanyLoginRestrictionReqDto.loginRestrictionType;
    /**
     * 로그인 제한명
     */
    loginRestrictionName?: string;
    /**
     * 로그인 제한 설정 방식
     */
    loginRestrictionSettingType?: com_ever_edu_pms_company_dto_req_CompanyLoginRestrictionReqDto.loginRestrictionSettingType;
    /**
     * 제한기간 시작일(yyyyMMdd)
     */
    restrictionStartDate?: string;
    /**
     * 제한기간 종료일(yyyyMMdd)
     */
    restrictionEndDate?: string;
    /**
     * 회사로그인제한 설정정보
     */
    companyLoginRestrictionDetailList?: Array<com_ever_edu_pms_company_dto_req_CompanyLoginRestrictionDetailReqDto>;
    /**
     * 사용여부
     */
    isUsed?: boolean;
};
export namespace com_ever_edu_pms_company_dto_req_CompanyLoginRestrictionReqDto {
    /**
     * 로그인 제한 구분
     */
    export enum loginRestrictionType {
        LOGIN_TIME_RESTRICTION = 'LOGIN_TIME_RESTRICTION',
        WORK_TIME_RESTRICTION = 'WORK_TIME_RESTRICTION',
        NONE = 'NONE',
    }
    /**
     * 로그인 제한 설정 방식
     */
    export enum loginRestrictionSettingType {
        TIME_SETTING = 'TIME_SETTING',
        HR_INFO_SETTING = 'HR_INFO_SETTING',
    }
}

