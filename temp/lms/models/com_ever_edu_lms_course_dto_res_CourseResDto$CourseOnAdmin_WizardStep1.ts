/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto_WizardStep1 } from './com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto_WizardStep1';
import type { com_ever_edu_lms_category_dto_res_CourseCategoryFlatDto_WizardStep1 } from './com_ever_edu_lms_category_dto_res_CourseCategoryFlatDto_WizardStep1';
export type com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin_WizardStep1 = {
    wizardStep?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin_WizardStep1.wizardStep;
    courseId?: number;
    courseType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin_WizardStep1.courseType;
    language?: string;
    channelId?: number;
    courseName?: string;
    courseSummary?: string;
    courseGoal?: string;
    courseContent?: string;
    trainingTarget?: string;
    trainingLevelType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin_WizardStep1.trainingLevelType;
    tenantIds?: Array<number>;
    primaryCategoryId?: number;
    /**
     * 카테고리 경로 노출
     */
    categories?: Array<com_ever_edu_lms_category_dto_res_CourseCategoryFlatDto_WizardStep1>;
    whiteList?: Array<com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto_WizardStep1>;
    coordinatorId?: number;
    coordinatorTelNo?: string;
    operatorId?: number;
    operatorTelNo?: string;
};
export namespace com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin_WizardStep1 {
    export enum wizardStep {
        STEP1 = 'STEP1',
        STEP2 = 'STEP2',
        STEP3 = 'STEP3',
        STEP4 = 'STEP4',
        STEP5 = 'STEP5',
        FULL_UPDATE = 'FULL_UPDATE',
    }
    export enum courseType {
        ELEARNING1 = 'ELEARNING1',
        ELEARNING2 = 'ELEARNING2',
        CLASS = 'CLASS',
        LIVE = 'LIVE',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
    }
    export enum trainingLevelType {
        NONE = 'NONE',
        BEGINNER = 'BEGINNER',
        BASIC = 'BASIC',
        INTERMEDIATE = 'INTERMEDIATE',
        ADVANCED = 'ADVANCED',
        EXPERT = 'EXPERT',
    }
}

