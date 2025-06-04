/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_role_dto_req_RoleUpdateReqDto = {
    /**
     * 사이트 구분
     */
    siteScope?: com_ever_edu_pms_role_dto_req_RoleUpdateReqDto.siteScope;
    /**
     * 부모 역할 ID
     */
    parentRoleId?: number;
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
    tenantScope?: com_ever_edu_pms_role_dto_req_RoleUpdateReqDto.tenantScope;
    /**
     * 테넌트 ID
     */
    tenantId?: number;
    /**
     * 회사 적용 범위
     */
    companyScope?: com_ever_edu_pms_role_dto_req_RoleUpdateReqDto.companyScope;
    /**
     * 회사 ID
     */
    companyIds?: Array<number>;
    /**
     * 채널 적용 범위
     */
    channelScope?: com_ever_edu_pms_role_dto_req_RoleUpdateReqDto.channelScope;
    /**
     * 채널 ID
     */
    channelIds?: Array<number>;
    /**
     * 팀 적용 범위
     */
    deptScope?: com_ever_edu_pms_role_dto_req_RoleUpdateReqDto.deptScope;
    /**
     * 조직 ID
     */
    deptIds?: Array<number>;
    /**
     * 사용여부
     */
    isUsed?: boolean;
};
export namespace com_ever_edu_pms_role_dto_req_RoleUpdateReqDto {
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

