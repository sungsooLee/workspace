/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_res_CourseListResDto$OnUser = {
    courseUuid?: string;
    courseName?: string;
    courseType?: com_ever_edu_lms_course_dto_res_CourseListResDto$OnUser.courseType;
};
export namespace com_ever_edu_lms_course_dto_res_CourseListResDto$OnUser {
    export enum courseType {
        CLASS = 'CLASS',
        ELEARNING = 'ELEARNING',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
        LINK = 'LINK',
        DEFAULT = 'DEFAULT',
    }
}

