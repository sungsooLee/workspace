/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_course_dto_res_CourseResDto$TagNameWrapper_WizardStep5 } from './com_ever_edu_lms_course_dto_res_CourseResDto$TagNameWrapper_WizardStep5';
export type com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin_WizardStep5 = {
    wizardStep?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin_WizardStep5.wizardStep;
    courseId?: number;
    courseType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin_WizardStep5.courseType;
    thumbnailFileGroupId?: number;
    primaryThumbnailFileId?: number;
    /**
     * 태그 이름 목록
     */
    tagNames?: Array<com_ever_edu_lms_course_dto_res_CourseResDto$TagNameWrapper_WizardStep5>;
    courseValidityStartDate?: string;
    courseValidityEndDate?: string;
};
export namespace com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin_WizardStep5 {
    export enum wizardStep {
        STEP1 = 'STEP1',
        STEP2 = 'STEP2',
        STEP3 = 'STEP3',
        STEP4 = 'STEP4',
        STEP5 = 'STEP5',
        FULL_UPDATE = 'FULL_UPDATE',
    }
    export enum courseType {
        ELEARNING = 'ELEARNING',
        CLASS = 'CLASS',
        LIVE = 'LIVE',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
    }
}

