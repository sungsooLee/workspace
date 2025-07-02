/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_pms_role_dto_res_RoleResDto } from './com_ever_edu_pms_role_dto_res_RoleResDto';
import type { com_ever_edu_pms_user_dto_res_UserResDto } from './com_ever_edu_pms_user_dto_res_UserResDto';
export type com_ever_edu_pms_role_dto_res_RoleApplicationHistoryResDto = {
    /**
     * 역할 신청 이력 ID
     */
    roleApplicationHistoryId?: number;
    /**
     * 역할 신청 ID
     */
    roleApplicationId?: number;
    applicant?: com_ever_edu_pms_user_dto_res_UserResDto;
    role?: com_ever_edu_pms_role_dto_res_RoleResDto;
    /**
     * 신청 사유
     */
    reason?: string;
    /**
     * 상태
     */
    status?: com_ever_edu_pms_role_dto_res_RoleApplicationHistoryResDto.status;
    approver?: com_ever_edu_pms_user_dto_res_UserResDto;
    /**
     * 반려 사유
     */
    rejectReason?: string;
    /**
     * 등록일시
     */
    createdDate?: string;
    /**
     * 승인일시
     */
    approvedDate?: string;
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

