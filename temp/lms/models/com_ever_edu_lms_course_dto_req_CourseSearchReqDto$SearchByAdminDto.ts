/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_req_CourseSearchReqDto$SearchByAdminDto = {
    courseName?: string;
    courseId?: number;
    courseType?: com_ever_edu_lms_course_dto_req_CourseSearchReqDto$SearchByAdminDto.courseType;
    tenantId: number;
    channelId: number;
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

