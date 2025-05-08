/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_category_dto_res_CategoryMasterFlatDto } from './com_ever_edu_lms_category_dto_res_CategoryMasterFlatDto';
export type com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnUser = {
    courseUuid?: string;
    channelId?: number;
    channelName?: string;
    courseType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnUser.courseType;
    courseName?: string;
    trainingGoals?: string;
    coordinatorName?: string;
    openingYear?: number;
    categories?: Array<com_ever_edu_lms_category_dto_res_CategoryMasterFlatDto>;
};
export namespace com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnUser {
    export enum courseType {
        CLASS = 'CLASS',
        ELEARNING = 'ELEARNING',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
        LINK = 'LINK',
        DEFAULT = 'DEFAULT',
    }
}

