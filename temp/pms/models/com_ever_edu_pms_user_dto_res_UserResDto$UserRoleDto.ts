/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 사용자 역할 목록
 */
export type com_ever_edu_pms_user_dto_res_UserResDto$UserRoleDto = {
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
    siteScope?: com_ever_edu_pms_user_dto_res_UserResDto$UserRoleDto.siteScope;
    /**
     * 역할 타입
     */
    roleType?: com_ever_edu_pms_user_dto_res_UserResDto$UserRoleDto.roleType;
    /**
     * 테넌트 적용 범위
     */
    tenantScope?: com_ever_edu_pms_user_dto_res_UserResDto$UserRoleDto.tenantScope;
    /**
     * 회사 적용 범위
     */
    companyScope?: com_ever_edu_pms_user_dto_res_UserResDto$UserRoleDto.companyScope;
    /**
     * 부서 적용 범위
     */
    deptScope?: com_ever_edu_pms_user_dto_res_UserResDto$UserRoleDto.deptScope;
    /**
     * 채널 적용 범위
     */
    channelScope?: com_ever_edu_pms_user_dto_res_UserResDto$UserRoleDto.channelScope;
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
export namespace com_ever_edu_pms_user_dto_res_UserResDto$UserRoleDto {
    /**
     * 사이트 구분
     */
    export enum siteScope {
        FO = 'FO',
        BO = 'BO',
    }
    /**
     * 역할 타입
     */
    export enum roleType {
        PLATFORM_MANAGER = 'PLATFORM_MANAGER',
        TENANT_MANAGER = 'TENANT_MANAGER',
        CHANNEL_OWNER = 'CHANNEL_OWNER',
        CHANNEL_MEMBER = 'CHANNEL_MEMBER',
        CHANNEL_GUEST_OPERATION = 'CHANNEL_GUEST_OPERATION',
        CHANNEL_GUEST_COURSE = 'CHANNEL_GUEST_COURSE',
        POLICY_MANAGER = 'POLICY_MANAGER',
        TUTOR = 'TUTOR',
        LEADER = 'LEADER',
        MEMBER = 'MEMBER',
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
        CURRENT_TENANT_COMPANY = 'CURRENT_TENANT_COMPANY',
        CURRENT_COMPANY = 'CURRENT_COMPANY',
        MANUAL = 'MANUAL',
    }
    /**
     * 부서 적용 범위
     */
    export enum deptScope {
        ALL = 'ALL',
        CURRENT_TENANT_TEAM = 'CURRENT_TENANT_TEAM',
        CURRENT_TEAM_INCLUSIVE = 'CURRENT_TEAM_INCLUSIVE',
        MANUAL = 'MANUAL',
    }
    /**
     * 채널 적용 범위
     */
    export enum channelScope {
        ALL = 'ALL',
        CURRENT_TENANT_CHANNEL = 'CURRENT_TENANT_CHANNEL',
        MANUAL = 'MANUAL',
        CURRENT_CHANNEL_INCLUSIVE = 'CURRENT_CHANNEL_INCLUSIVE',
    }
}

