/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_res_SequenceListResDto$OnAdmin = {
    courseSequenceId?: number;
    courseSequenceName?: string;
    enrollmentStartDate?: string;
    enrollmentEndDate?: string;
    courseSequenceStartDate?: string;
    courseSequenceEndDate?: string;
    learningStartDays?: number;
    maxEnrollQuota?: number;
    currentEnrollCount?: number;
    learningStartType?: com_ever_edu_lms_course_dto_res_SequenceListResDto$OnAdmin.learningStartType;
};
export namespace com_ever_edu_lms_course_dto_res_SequenceListResDto$OnAdmin {
    export enum learningStartType {
        FIXED_DATE = 'FIXED_DATE',
        DAYS_AFTER_ENROLL = 'DAYS_AFTER_ENROLL',
    }
}

