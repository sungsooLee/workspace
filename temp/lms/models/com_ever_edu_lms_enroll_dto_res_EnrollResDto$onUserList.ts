/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_enroll_dto_res_EnrollResDto$onUserList = {
    courseType?: com_ever_edu_lms_enroll_dto_res_EnrollResDto$onUserList.courseType;
    courseUuid?: string;
    courseSequenceUuid?: string;
    courseSequenceName?: string;
    courseEnrollId?: number;
    courseSequenceStartDate?: string;
    courseSequenceEndDate?: string;
    enrollStatusType?: com_ever_edu_lms_enroll_dto_res_EnrollResDto$onUserList.enrollStatusType;
};
export namespace com_ever_edu_lms_enroll_dto_res_EnrollResDto$onUserList {
    export enum courseType {
        ELEARNING1 = 'ELEARNING1',
        ELEARNING2 = 'ELEARNING2',
        CLASS = 'CLASS',
        LIVE = 'LIVE',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
    }
    export enum enrollStatusType {
        ENROLL_DONE = 'ENROLL_DONE',
        ENROLL_REQUEST = 'ENROLL_REQUEST',
        CANCEL_DONE = 'CANCEL_DONE',
    }
}

