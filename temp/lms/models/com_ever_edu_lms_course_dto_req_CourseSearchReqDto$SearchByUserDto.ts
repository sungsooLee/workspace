/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_req_CourseSearchReqDto$SearchByUserDto = {
    courseName?: string;
    courseType?: com_ever_edu_lms_course_dto_req_CourseSearchReqDto$SearchByUserDto.courseType;
};
export namespace com_ever_edu_lms_course_dto_req_CourseSearchReqDto$SearchByUserDto {
    export enum courseType {
        CLASS = 'CLASS',
        ELEARNING = 'ELEARNING',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
        LINK = 'LINK',
        DEFAULT = 'DEFAULT',
    }
}

