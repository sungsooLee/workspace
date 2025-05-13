/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_enroll_dto_req_AdditionalInfoDto$ApprovalInfoDto$ApproverInfoDto = {
    approvalOrder?: number;
    approverType?: com_ever_edu_lms_enroll_dto_req_AdditionalInfoDto$ApprovalInfoDto$ApproverInfoDto.approverType;
    userUuid?: string;
};
export namespace com_ever_edu_lms_enroll_dto_req_AdditionalInfoDto$ApprovalInfoDto$ApproverInfoDto {
    export enum approverType {
        COORDINATOR = 'COORDINATOR',
        LEADER = 'LEADER',
    }
}

