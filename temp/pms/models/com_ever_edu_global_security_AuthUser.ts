/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { org_springframework_security_core_GrantedAuthority } from './org_springframework_security_core_GrantedAuthority';
export type com_ever_edu_global_security_AuthUser = {
    userId?: number;
    /**
     * UUID
     */
    uuid?: string;
    /**
     * 사번(GIM: EMP_NO)
     */
    employeeNumber?: string;
    /**
     * 성명(GIM: EMP_NAME)
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
     * 이메일(GIM: EMAIL)
     */
    email?: string;
    /**
     * 휴대전화번호(GIM: MOBILE)
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
     * 계정 잠김 여부
     */
    locked?: boolean;
    /**
     * 회원상태코드
     */
    userState?: com_ever_edu_global_security_AuthUser.userState;
    /**
     * 역할
     */
    authorities?: Array<org_springframework_security_core_GrantedAuthority>;
    /**
     * 테넌트
     */
    tenants?: Array<Record<string, Record<string, any>>>;
    enabled?: boolean;
    username?: string;
    accountNonExpired?: boolean;
    accountNonLocked?: boolean;
    credentialsNonExpired?: boolean;
};
export namespace com_ever_edu_global_security_AuthUser {
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
}

