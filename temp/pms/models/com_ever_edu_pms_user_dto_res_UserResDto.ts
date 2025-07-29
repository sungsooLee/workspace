/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_company_dto_res_CompanyDeptResDto } from './com_ever_edu_pms_company_dto_res_CompanyDeptResDto';
import type { com_ever_edu_pms_company_dto_res_CompanyResDto } from './com_ever_edu_pms_company_dto_res_CompanyResDto';
import type { com_ever_edu_pms_user_dto_res_UserResDto$UserRoleDto } from './com_ever_edu_pms_user_dto_res_UserResDto$UserRoleDto';
import type { com_ever_edu_pms_user_dto_res_UserResDto$UserTenantDto } from './com_ever_edu_pms_user_dto_res_UserResDto$UserTenantDto';
/**
 * 승인자
 */
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
     * 휴대폰 번호
     */
    phoneNumber?: string;
    /**
     * 직장전화 번호
     */
    companyPhoneNumber?: string;
    company?: com_ever_edu_pms_company_dto_res_CompanyResDto;
    dept?: com_ever_edu_pms_company_dto_res_CompanyDeptResDto;
    /**
     * 보직 여부
     */
    isLeader?: boolean;
    /**
     * 직군
     */
    jobDomain?: Array<string>;
    /**
     * 직무
     */
    jobRole?: Array<string>;
    /**
     * 호칭
     */
    positionName?: string;
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
     * 비밀번호 만료 일자
     */
    passwordExpireDate?: string;
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
     * 2차 인증 유형 유형
     */
    twoFactorAuthType?: com_ever_edu_pms_user_dto_res_UserResDto.twoFactorAuthType;
    /**
     * FO 로그인 2차 인증 사용
     */
    foTwoFactorAuthEnabled?: boolean;
    /**
     * BO 로그인 2차 인증 사용
     */
    boTwoFactorAuthEnabled?: boolean;
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
    /**
     * 사용자 테넌트 목록
     */
    tenants?: Array<com_ever_edu_pms_user_dto_res_UserResDto$UserTenantDto>;
    /**
     * 사용자 역할 목록
     */
    roles?: Array<com_ever_edu_pms_user_dto_res_UserResDto$UserRoleDto>;
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
        DENIED_PASSWORD = 'DENIED_PASSWORD',
    }
    /**
     * 2차 인증 유형 유형
     */
    export enum twoFactorAuthType {
        MPASS = 'MPASS',
        MPASS_OTP = 'MPASS_OTP',
        MPASS_FIDO = 'MPASS_FIDO',
        GOOGLE_OTP = 'GOOGLE_OTP',
    }
}

