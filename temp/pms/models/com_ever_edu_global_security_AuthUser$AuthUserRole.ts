/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 사용자 역할 목록
 */
export type com_ever_edu_global_security_AuthUser$AuthUserRole = {
    /**
     * 역할 ID
     */
    roleId?: number;
    /**
     * 역할명
     */
    roleName?: string;
    /**
     * 사이트 구분
     */
    siteScope?: com_ever_edu_global_security_AuthUser$AuthUserRole.siteScope;
    /**
     * 테넌트 적용 범위
     */
    tenantScope?: com_ever_edu_global_security_AuthUser$AuthUserRole.tenantScope;
    /**
     * 회사 적용 범위
     */
    companyScope?: com_ever_edu_global_security_AuthUser$AuthUserRole.companyScope;
    /**
     * 부서 적용 범위
     */
    deptScope?: com_ever_edu_global_security_AuthUser$AuthUserRole.deptScope;
    /**
     * 채널 적용 범위
     */
    channelScope?: com_ever_edu_global_security_AuthUser$AuthUserRole.channelScope;
    /**
     * 테넌트 ID
     */
    tenantId?: number;
    /**
     * 회사 ID 목록
     */
    companyIds?: Array<number>;
    /**
     * 부서 ID 목록
     */
    deptIds?: Array<number>;
    /**
     * 채널 UUID 목록
     */
    channelUuids?: Array<string>;
};
export namespace com_ever_edu_global_security_AuthUser$AuthUserRole {
    /**
     * 사이트 구분
     */
    export enum siteScope {
        FO = 'FO',
        BO = 'BO',
    }
    /**
     * 테넌트 적용 범위
     */
    export enum tenantScope {
        ALL = 'ALL',
        CURRENT_TENANT = 'CURRENT_TENANT',
    }
    /**
     * 회사 적용 범위
     */
    export enum companyScope {
        ALL = 'ALL',
        CURRENT_COMPANY = 'CURRENT_COMPANY',
        MANUAL = 'MANUAL',
    }
    /**
     * 부서 적용 범위
     */
    export enum deptScope {
        ALL = 'ALL',
        CURRENT_TEAM = 'CURRENT_TEAM',
        CURRENT_TEAM_INCLUSIVE = 'CURRENT_TEAM_INCLUSIVE',
        MANUAL = 'MANUAL',
    }
    /**
     * 채널 적용 범위
     */
    export enum channelScope {
        ALL = 'ALL',
        CURRENT_CHANNEL = 'CURRENT_CHANNEL',
        CURRENT_CHANNEL_INCLUSIVE = 'CURRENT_CHANNEL_INCLUSIVE',
        MANUAL = 'MANUAL',
    }
}

