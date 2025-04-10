/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_company_entity_CompanyEntity } from './com_ever_edu_pms_company_entity_CompanyEntity';
import type { com_ever_edu_pms_company_entity_DeptEntity } from './com_ever_edu_pms_company_entity_DeptEntity';
export type com_ever_edu_pms_user_dto_res_UserResDto = {
    /**
     * 사용자 ID
     */
    userId?: number;
    /**
     * 사용자 코드
     */
    userCode?: string;
    /**
     * 사번
     */
    employeeNumber?: string;
    /**
     * 성명
     */
    name?: string;
    /**
     * 영문성명
     */
    engName?: string;
    /**
     * 생년월일
     */
    birthday?: number;
    /**
     * Email
     */
    email?: string;
    /**
     * 회사 전화번호
     */
    companyTelephoneNumber?: string;
    /**
     * 휴대전화번호
     */
    phoneNumber?: string;
    /**
     * 회원상태코드
     */
    stateCode?: com_ever_edu_pms_user_dto_res_UserResDto.stateCode;
    /**
     * 회원기본언어셋코드
     */
    locale?: {
        language?: string;
        script?: string;
        variant?: string;
        displayName?: string;
        country?: string;
        unicodeLocaleAttributes?: Array<string>;
        unicodeLocaleKeys?: Array<string>;
        displayLanguage?: string;
        displayScript?: string;
        displayCountry?: string;
        displayVariant?: string;
        extensionKeys?: Array<string>;
        iso3Language?: string;
        iso3Country?: string;
    };
    /**
     * 최종로그인일시
     */
    lastLoginDate?: string;
    /**
     * 로그인실패횟수
     */
    loginFailCount?: number;
    companyEntity?: com_ever_edu_pms_company_entity_CompanyEntity;
    deptEntity?: com_ever_edu_pms_company_entity_DeptEntity;
    /**
     * 사용자구분
     */
    accountType?: string;
    /**
     * 근무지코드
     */
    workPlaceCode?: string;
};
export namespace com_ever_edu_pms_user_dto_res_UserResDto {
    /**
     * 회원상태코드
     */
    export enum stateCode {
        WAIT = 'WAIT',
        NORMAL = 'NORMAL',
        HALT = 'HALT',
        LEAVE = 'LEAVE',
        DELETE = 'DELETE',
    }
}

