/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_req_SequenceSaveReqDto = {
    courseId: number;
    courseType: com_ever_edu_lms_course_dto_req_SequenceSaveReqDto.courseType;
    courseSequenceName: string;
    enrollStartDate?: string;
    enrollEndDate?: string;
    learningStartDate?: string;
    learningEndDate?: string;
    enrollCancelDeadLineDays?: number;
    isWaitListAvailable: boolean;
    maxWaitlistQuota: number;
    maxEnrollQuota?: number;
};
export namespace com_ever_edu_lms_course_dto_req_SequenceSaveReqDto {
    export enum courseType {
        ELEARNING = 'ELEARNING',
        CLASS = 'CLASS',
        LIVE = 'LIVE',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
        PACKAGE = 'PACKAGE',
    }
}

