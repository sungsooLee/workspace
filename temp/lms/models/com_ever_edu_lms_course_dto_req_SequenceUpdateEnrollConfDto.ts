/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_req_SequenceUpdateEnrollConfDto = {
    courseSequenceId: number;
    learningStartType: com_ever_edu_lms_course_dto_req_SequenceUpdateEnrollConfDto.learningStartType;
    enrollStartDate?: string;
    enrollEndDate?: string;
    learningStartDate?: string;
    learningEndDate?: string;
    maxEnrollQuota?: number;
};
export namespace com_ever_edu_lms_course_dto_req_SequenceUpdateEnrollConfDto {
    export enum learningStartType {
        FIXED_DATE = 'FIXED_DATE',
        DAYS_AFTER_ENROLL = 'DAYS_AFTER_ENROLL',
    }
}

