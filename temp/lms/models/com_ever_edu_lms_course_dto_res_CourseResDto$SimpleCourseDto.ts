/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_res_CourseResDto$SimpleCourseDto = {
    courseId?: number;
    courseName?: string;
    courseType?: com_ever_edu_lms_course_dto_res_CourseResDto$SimpleCourseDto.courseType;
};
export namespace com_ever_edu_lms_course_dto_res_CourseResDto$SimpleCourseDto {
    export enum courseType {
        ELEARNING = 'ELEARNING',
        CLASS = 'CLASS',
        LIVE = 'LIVE',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
        PACKAGE = 'PACKAGE',
    }
}

