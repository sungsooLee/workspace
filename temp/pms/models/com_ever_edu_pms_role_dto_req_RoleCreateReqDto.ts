/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_role_dto_req_RoleCreateReqDto = {
    /**
     * 사이트 구분(cmmon.SiteScope)
     */
    siteScope?: com_ever_edu_pms_role_dto_req_RoleCreateReqDto.siteScope;
    /**
     * 역할 타입(pms.role.RoleType)
     */
    roleType?: com_ever_edu_pms_role_dto_req_RoleCreateReqDto.roleType;
    /**
     * 부모 역할 ID
     */
    parentRoleId?: number;
    /**
     * 역할 트리 순서
     */
    sortOrder: number;
    /**
     * 이름
     */
    name: string;
    /**
     * 설명
     */
    description?: string;
    /**
     * 테넌트 적용 범위(pms.role.TenantScope)
     */
    tenantScope?: com_ever_edu_pms_role_dto_req_RoleCreateReqDto.tenantScope;
    /**
     * 테넌트 ID
     */
    tenantId?: number;
    /**
     * 회사 적용 범위(pms.role.CompanyScope)
     */
    companyScope?: com_ever_edu_pms_role_dto_req_RoleCreateReqDto.companyScope;
    /**
     * 회사 ID
     */
    companyIds?: Array<number>;
    /**
     * 채널 적용 범위(pms.role.ChannelScope)
     */
    channelScope?: com_ever_edu_pms_role_dto_req_RoleCreateReqDto.channelScope;
    /**
     * 채널 UUID
     */
    channelUuids?: Array<string>;
    /**
     * 팀 적용 범위(pms.role.DeptScope)
     */
    deptScope?: com_ever_edu_pms_role_dto_req_RoleCreateReqDto.deptScope;
    /**
     * 조직 ID
     */
    deptIds?: Array<number>;
    /**
     * 사용여부
     */
    isUsed?: boolean;
};
export namespace com_ever_edu_pms_role_dto_req_RoleCreateReqDto {
    /**
     * 사이트 구분(cmmon.SiteScope)
     */
    export enum siteScope {
        FO = 'FO',
        BO = 'BO',
    }
    /**
     * 역할 타입(pms.role.RoleType)
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
     * 테넌트 적용 범위(pms.role.TenantScope)
     */
    export enum tenantScope {
        ALL = 'ALL',
        CURRENT_TENANT = 'CURRENT_TENANT',
    }
    /**
     * 회사 적용 범위(pms.role.CompanyScope)
     */
    export enum companyScope {
        ALL = 'ALL',
        CURRENT_COMPANY = 'CURRENT_COMPANY',
        MANUAL = 'MANUAL',
    }
    /**
     * 채널 적용 범위(pms.role.ChannelScope)
     */
    export enum channelScope {
        ALL = 'ALL',
        CURRENT_CHANNEL = 'CURRENT_CHANNEL',
        CURRENT_CHANNEL_INCLUSIVE = 'CURRENT_CHANNEL_INCLUSIVE',
        MANUAL = 'MANUAL',
    }
    /**
     * 팀 적용 범위(pms.role.DeptScope)
     */
    export enum deptScope {
        ALL = 'ALL',
        CURRENT_TEAM = 'CURRENT_TEAM',
        CURRENT_TEAM_INCLUSIVE = 'CURRENT_TEAM_INCLUSIVE',
        MANUAL = 'MANUAL',
    }
}

