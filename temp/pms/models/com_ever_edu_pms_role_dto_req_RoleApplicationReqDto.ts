/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_role_dto_req_RoleApplicationReqDto = {
    /**
     * 사용자 UUID
     */
    userUuid: string;
    /**
     * 역할 ID
     */
    roleId: number;
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
    status?: com_ever_edu_pms_role_dto_req_RoleApplicationReqDto.status;
};
export namespace com_ever_edu_pms_role_dto_req_RoleApplicationReqDto {
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

