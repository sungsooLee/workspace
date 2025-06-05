/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_channel_dto_res_ChannelResDto } from './com_ever_edu_pms_channel_dto_res_ChannelResDto';
export type com_ever_edu_pms_role_dto_res_RoleApplicationResDto = {
    /**
     * 역할 신청 ID
     */
    roleApplicationId?: number;
    /**
     * 회사 ID
     */
    companyId?: number;
    /**
     * 회사명
     */
    companyName?: string;
    /**
     * 조직 ID
     */
    deptId?: number;
    /**
     * 조직명
     */
    deptName?: string;
    /**
     * 사용자 UUID
     */
    userUuid?: string;
    /**
     * 사용자명
     */
    userName?: string;
    /**
     * 사번
     */
    employeeNumber?: string;
    /**
     * 역할 ID
     */
    roleId?: number;
    /**
     * 역할명
     */
    roleName?: string;
    /**
     * 테넌트 ID
     */
    tenantId?: number;
    /**
     * 테넌트명
     */
    tenantName?: string;
    /**
     * 채널 목록
     */
    channels?: Array<com_ever_edu_pms_channel_dto_res_ChannelResDto>;
    /**
     * 권한 시작일
     */
    startDate?: string;
    /**
     * 권한 종료일
     */
    endDate?: string;
    /**
     * 신청 사유
     */
    reason?: string;
    /**
     * 상태
     */
    status?: com_ever_edu_pms_role_dto_res_RoleApplicationResDto.status;
    /**
     * 반려 사유
     */
    rejectReason?: string;
    /**
     * 신청자
     */
    createdBy?: string;
    /**
     * 사용 여부
     */
    isUsed?: boolean;
    /**
     * 신청일
     */
    createdDate?: string;
    /**
     * 승인자
     */
    lastModifiedBy?: string;
    /**
     * 승인/반려일
     */
    modifiedDate?: string;
};
export namespace com_ever_edu_pms_role_dto_res_RoleApplicationResDto {
    /**
     * 상태
     */
    export enum status {
        NEW = 'NEW',
        EXTEND = 'EXTEND',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED',
    }
}

