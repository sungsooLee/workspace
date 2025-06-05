/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_role_dto_req_RoleApplicationApproveReqDto = {
    /**
     * 역할 신청 ID 목록
     */
    roleApplicationIds?: Array<number>;
    /**
     * 승인/반려
     */
    status?: com_ever_edu_pms_role_dto_req_RoleApplicationApproveReqDto.status;
    /**
     * 역할 신청 반려 사유
     */
    rejectReason?: string;
};
export namespace com_ever_edu_pms_role_dto_req_RoleApplicationApproveReqDto {
    /**
     * 승인/반려
     */
    export enum status {
        NEW = 'NEW',
        EXTEND = 'EXTEND',
        APPROVED = 'APPROVED',
        REJECTED = 'REJECTED',
    }
}

