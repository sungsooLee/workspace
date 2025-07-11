/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_res_CourseListAdminResDto = {
    tenantName?: string;
    channelName?: string;
    courseId?: number;
    openingYear?: number;
    courseType?: com_ever_edu_lms_course_dto_res_CourseListAdminResDto.courseType;
    isBookmarks?: boolean;
    courseName?: string;
    language?: string;
    isUsed?: boolean;
    sequenceCount?: number;
    viewCount?: number;
    likesCount?: number;
    shareCount?: number;
    reviewCount?: number;
    studentCount?: number;
    coordinatorName?: string;
    operatorName?: string;
};
export namespace com_ever_edu_lms_course_dto_res_CourseListAdminResDto {
    export enum courseType {
        ELEARNING1 = 'ELEARNING1',
        ELEARNING2 = 'ELEARNING2',
        CLASS = 'CLASS',
        LIVE = 'LIVE',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
    }
}

