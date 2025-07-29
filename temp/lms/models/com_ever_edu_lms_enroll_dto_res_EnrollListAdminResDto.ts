/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_enroll_dto_res_EnrollListAdminResDto = {
    courseSequenceId?: number;
    courseSequenceName?: string;
    openingYear?: number;
    learningStartDate?: string;
    learningEndDate?: string;
    enrollId?: number;
    createdDate?: string;
    enrollStatusType?: com_ever_edu_lms_enroll_dto_res_EnrollListAdminResDto.enrollStatusType;
    userId?: number;
    departmentName?: string;
    companyName?: string;
    employeeNumber?: string;
    userName?: string;
    approvalReason?: string;
    finalApprovalDate?: string;
};
export namespace com_ever_edu_lms_enroll_dto_res_EnrollListAdminResDto {
    export enum enrollStatusType {
        ENROLL_DONE = 'ENROLL_DONE',
        ENROLL_REQUEST = 'ENROLL_REQUEST',
        CANCEL_DONE = 'CANCEL_DONE',
        REJECT_DONE = 'REJECT_DONE',
    }
}

