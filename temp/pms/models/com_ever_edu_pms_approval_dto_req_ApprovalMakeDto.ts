/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_pms_approval_dto_req_ApprovalMakeDto = {
    requesterId?: number;
    approvalBusinessType?: com_ever_edu_pms_approval_dto_req_ApprovalMakeDto.approvalBusinessType;
    typeRefId?: number;
};
export namespace com_ever_edu_pms_approval_dto_req_ApprovalMakeDto {
    export enum approvalBusinessType {
        ENROLL = 'ENROLL',
        LICENSE_EXPENSE = 'LICENSE_EXPENSE',
    }
}

