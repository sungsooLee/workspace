/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_global_security_AuthUser$AuthUserRole } from './com_ever_edu_global_security_AuthUser$AuthUserRole';
import type { com_ever_edu_global_security_AuthUser$AuthUserTenant } from './com_ever_edu_global_security_AuthUser$AuthUserTenant';
import type { org_springframework_security_core_GrantedAuthority } from './org_springframework_security_core_GrantedAuthority';
export type com_ever_edu_global_security_AuthUser = {
    userId?: number;
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
     * 성명
     */
    name?: string;
    /**
     * 생년월일
     */
    birthday?: string;
    /**
     * 회사 ID
     */
    companyId?: number;
    /**
     * 회사 코드
     */
    companyCode?: string;
    /**
     * 회사유형
     */
    companyType?: com_ever_edu_global_security_AuthUser.companyType;
    /**
     * 회사명
     */
    companyName?: string;
    /**
     * 회사 사용 여부
     */
    companyIsUsed?: boolean;
    /**
     * 이메일
     */
    email?: string;
    /**
     * 휴대전화번호
     */
    phoneNumber?: string;
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
     * 비밀번호 변경 일자
     */
    passwordChangeDate?: string;
    /**
     * 비밀번호 만료 일자
     */
    passwordExpireDate?: string;
    /**
     * 로그인실패횟수
     */
    loginFailCount?: number;
    /**
     * 회원상태코드
     */
    userState?: com_ever_edu_global_security_AuthUser.userState;
    /**
     * 계정잠김일시
     */
    lockedDate?: string;
    /**
     * 비밀번호 인증 유형
     */
    authType?: com_ever_edu_global_security_AuthUser.authType;
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
     * 역할
     */
    authorities?: Array<org_springframework_security_core_GrantedAuthority>;
    /**
     * 사용자 테넌트 목록
     */
    tenants?: Array<com_ever_edu_global_security_AuthUser$AuthUserTenant>;
    /**
     * 사용자 역할 목록
     */
    roles?: Array<com_ever_edu_global_security_AuthUser$AuthUserRole>;
    enabled?: boolean;
    username?: string;
    accountNonExpired?: boolean;
    accountNonLocked?: boolean;
    credentialsNonExpired?: boolean;
};
export namespace com_ever_edu_global_security_AuthUser {
    /**
     * 회사유형
     */
    export enum companyType {
        CAR = 'CAR',
        GLOBAL = 'GLOBAL',
        GROUP = 'GROUP',
        SERVICE = 'SERVICE',
        SALES = 'SALES',
        GLOBAL_DEALER = 'GLOBAL_DEALER',
        ETC_SERVICE = 'ETC_SERVICE',
        HELLO_HMG = 'HELLO_HMG',
        EDU_SERVICE = 'EDU_SERVICE',
        ETC = 'ETC',
    }
    /**
     * 회원상태코드
     */
    export enum userState {
        WAIT = 'WAIT',
        NORMAL = 'NORMAL',
        HALT = 'HALT',
        LEAVE = 'LEAVE',
        DELETE = 'DELETE',
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

