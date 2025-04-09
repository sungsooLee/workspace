/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_approval_dto_req_ApprovalMakeDto = {
    requesterId?: number;
    approvalType?: com_ever_edu_pms_approval_dto_req_ApprovalMakeDto.approvalType;
    typeRefId?: number;
};
export namespace com_ever_edu_pms_approval_dto_req_ApprovalMakeDto {
    export enum approvalType {
        ENROLL = 'ENROLL',
        LICENSE_EXPENSE = 'LICENSE_EXPENSE',
    }
}

