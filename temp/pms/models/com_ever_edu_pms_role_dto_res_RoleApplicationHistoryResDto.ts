/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_global_dto_IdNameDto } from './com_ever_edu_global_dto_IdNameDto';
import type { com_ever_edu_global_dto_UuidNameDto } from './com_ever_edu_global_dto_UuidNameDto';
export type com_ever_edu_pms_role_dto_res_RoleApplicationHistoryResDto = {
    /**
     * 역할 신청 이력 ID
     */
    roleApplicationHistoryId?: number;
    /**
     * 역할 신청 ID
     */
    roleApplicationId?: number;
    user?: com_ever_edu_global_dto_UuidNameDto;
    role?: com_ever_edu_global_dto_IdNameDto;
    /**
     * 신청 사유
     */
    reason?: string;
    /**
     * 상태
     */
    status?: com_ever_edu_pms_role_dto_res_RoleApplicationHistoryResDto.status;
    /**
     * 반려 사유
     */
    rejectReason?: string;
    /**
     * 등록자 UUID
     */
    createdBy?: string;
    /**
     * 등록일시
     */
    createdDate?: string;
};
export namespace com_ever_edu_pms_role_dto_res_RoleApplicationHistoryResDto {
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

