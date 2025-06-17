/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_global_dto_IdNameDto } from './com_ever_edu_global_dto_IdNameDto';
import type { com_ever_edu_global_dto_UuidNameDto } from './com_ever_edu_global_dto_UuidNameDto';
export type com_ever_edu_pms_role_dto_res_RoleResDto = {
    /**
     * 역할 ID
     */
    roleId?: number;
    /**
     * 사이트 구분
     */
    siteScope?: com_ever_edu_pms_role_dto_res_RoleResDto.siteScope;
    /**
     * 역할 타입
     */
    roleType?: com_ever_edu_pms_role_dto_res_RoleResDto.roleType;
    /**
     * 부모 역할 ID
     */
    parentRoleId?: number;
    /**
     * 역할 트리 순서
     */
    sortOrder?: number;
    /**
     * 이름
     */
    name?: string;
    /**
     * 설명
     */
    description?: string;
    /**
     * 테넌트 적용 범위
     */
    tenantScope?: com_ever_edu_pms_role_dto_res_RoleResDto.tenantScope;
    /**
     * 테넌트 ID
     */
    tenantId?: number;
    /**
     * 회사 적용 범위
     */
    companyScope?: com_ever_edu_pms_role_dto_res_RoleResDto.companyScope;
    /**
     * 회사 목록
     */
    companies?: Array<com_ever_edu_global_dto_IdNameDto>;
    /**
     * 채널 적용 범위
     */
    channelScope?: com_ever_edu_pms_role_dto_res_RoleResDto.channelScope;
    /**
     * 채널 목록
     */
    channels?: Array<com_ever_edu_global_dto_UuidNameDto>;
    /**
     * 팀 적용 범위
     */
    deptScope?: com_ever_edu_pms_role_dto_res_RoleResDto.deptScope;
    /**
     * 조직 목록
     */
    depts?: Array<com_ever_edu_global_dto_IdNameDto>;
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
export namespace com_ever_edu_pms_role_dto_res_RoleResDto {
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
        CHANNEL_GUEST = 'CHANNEL_GUEST',
        POLICY_MANAGER = 'POLICY_MANAGER',
        TUTOR = 'TUTOR',
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
     * 채널 적용 범위
     */
    export enum channelScope {
        ALL = 'ALL',
        CURRENT_CHANNEL = 'CURRENT_CHANNEL',
        CURRENT_CHANNEL_INCLUSIVE = 'CURRENT_CHANNEL_INCLUSIVE',
        MANUAL = 'MANUAL',
    }
    /**
     * 팀 적용 범위
     */
    export enum deptScope {
        ALL = 'ALL',
        CURRENT_TEAM = 'CURRENT_TEAM',
        CURRENT_TEAM_INCLUSIVE = 'CURRENT_TEAM_INCLUSIVE',
        MANUAL = 'MANUAL',
    }
}

