/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_external_course_dto_CourseResDto = {
    courseId?: number;
    courseUuid?: string;
    courseName?: string;
    language?: string;
    courseType?: com_ever_edu_external_course_dto_CourseResDto.courseType;
    courseContent?: string;
    channelId?: number;
    channelUuid?: string;
    channelName?: string;
    openingYear?: number;
    courseValidityStartDate?: string;
    courseValidityEndDate?: string;
};
export namespace com_ever_edu_external_course_dto_CourseResDto {
    export enum courseType {
        ELEARNING1 = 'ELEARNING1',
        ELEARNING2 = 'ELEARNING2',
        CLASS = 'CLASS',
        LIVE = 'LIVE',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
    }
}

