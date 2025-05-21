/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_req_CourseSearchReqDto$SearchByAdminDto = {
    tenantId: number;
    channelId?: number;
    courseType?: com_ever_edu_lms_course_dto_req_CourseSearchReqDto$SearchByAdminDto.courseType;
    operatorName?: string;
    courseId?: number;
    openYear?: number;
    isUsed?: number;
    courseName?: string;
};
export namespace com_ever_edu_lms_course_dto_req_CourseSearchReqDto$SearchByAdminDto {
    export enum courseType {
        ELEARNING = 'ELEARNING',
        CLASS = 'CLASS',
        LIVE = 'LIVE',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
    }
}

