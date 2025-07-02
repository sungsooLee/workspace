/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_company_dto_res_CompanyDeptResDto } from './com_ever_edu_pms_company_dto_res_CompanyDeptResDto';
import type { com_ever_edu_pms_company_dto_res_CompanyResDto } from './com_ever_edu_pms_company_dto_res_CompanyResDto';
export type com_ever_edu_pms_user_dto_res_UserResDto = {
    /**
     * UUID
     */
    uuid?: string;
    /**
     * 사번
     */
    employeeNumber?: string;
    /**
     * GUCC ID
     */
    guccId?: string;
    /**
     * 연동시스템
     */
    linkageSystem?: com_ever_edu_pms_user_dto_res_UserResDto.linkageSystem;
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
    birthday?: string;
    /**
     * 성별
     */
    gender?: com_ever_edu_pms_user_dto_res_UserResDto.gender;
    /**
     * 이메일
     */
    email?: string;
    /**
     * 휴대폰 국가번호
     */
    phoneNationNumber?: string;
    /**
     * 휴대폰 번호
     */
    phoneNumber?: string;
    /**
     * 직장전화 국가번호
     */
    companyPhoneNationNumber?: string;
    /**
     * 직장전화 번호
     */
    companyPhoneNumber?: string;
    company?: com_ever_edu_pms_company_dto_res_CompanyResDto;
    dept?: com_ever_edu_pms_company_dto_res_CompanyDeptResDto;
    /**
     * 국가코드
     */
    nationCd?: {
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
     * 언어코드
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
     * 로그인실패횟수
     */
    loginFailCount?: number;
    /**
     * 최종 로그인 일시
     */
    lastLoginDate?: string;
    /**
     * 비밀번호 변경 일자
     */
    passwordChangeDate?: string;
    /**
     * 입사일자
     */
    joinDate?: string;
    /**
     * 현직급승진일자
     */
    promotionDate?: string;
    /**
     * 휴직여부
     */
    isOnLeave?: boolean;
    /**
     * 정직여부
     */
    isSuspended?: boolean;
    /**
     * 퇴직일자
     */
    retireDate?: string;
    /**
     * 계정활성화일시
     */
    enabledDate?: string;
    /**
     * 계정잠김일시
     */
    lockedDate?: string;
    /**
     * 휴면계정전환일시
     */
    dormantDate?: string;
    /**
     * 회원탈퇴일시
     */
    deletedDate?: string;
    /**
     * SSO 유형
     */
    ssoType?: com_ever_edu_pms_user_dto_res_UserResDto.ssoType;
    /**
     * 비밀번호 인증 유형
     */
    authType?: com_ever_edu_pms_user_dto_res_UserResDto.authType;
    /**
     * 최근 접속 FO 테넌트 ID
     */
    lastVisitedFoTenantId?: number;
    /**
     * 최근 접속 FO 역할 ID
     */
    lastVisitedFoRoleId?: number;
    /**
     * 최근 접속 BO 테넌트 ID
     */
    lastVisitedBoTenantId?: number;
    /**
     * 최근 접속 BO 역할 ID
     */
    lastVisitedBoRoleId?: number;
};
export namespace com_ever_edu_pms_user_dto_res_UserResDto {
    /**
     * 연동시스템
     */
    export enum linkageSystem {
        GIM = 'GIM',
        HSW = 'HSW',
        KSW = 'KSW',
        DMSSH = 'DMSSH',
        DMSSK = 'DMSSK',
        DDMSH = 'DDMSH',
        DDMSK = 'DDMSK',
        VAATZ = 'VAATZ',
        GETIS = 'GETIS',
    }
    /**
     * 성별
     */
    export enum gender {
        MALE = 'MALE',
        FEMALE = 'FEMALE',
    }
    /**
     * SSO 유형
     */
    export enum ssoType {
        HMG_SSO = 'HMG_SSO',
        AUTOWAY = 'AUTOWAY',
        AES_LINK = 'AES_Link',
    }
    /**
     * 비밀번호 인증 유형
     */
    export enum authType {
        PLATFORM = 'PLATFORM',
        HMG_SSO = 'HMG_SSO',
        AUTOWAY = 'AUTOWAY',
    }
}

