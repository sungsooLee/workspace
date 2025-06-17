/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_res_CourseInternalResDto = {
    courseId?: number;
    courseUuid?: string;
    courseName?: string;
    courseType?: com_ever_edu_lms_course_dto_res_CourseInternalResDto.courseType;
    courseContent?: string;
    channelId?: number;
    channelUuid?: string;
    channelName?: string;
    openingYear?: number;
    isUsed?: boolean;
};
export namespace com_ever_edu_lms_course_dto_res_CourseInternalResDto {
    export enum courseType {
        ELEARNING1 = 'ELEARNING1',
        ELEARNING2 = 'ELEARNING2',
        CLASS = 'CLASS',
        LIVE = 'LIVE',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
    }
}

