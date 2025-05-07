/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto_WizardStep1 } from './com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto_WizardStep1';
export type com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep1 = {
    wizardStep: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep1.wizardStep;
    courseType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep1.courseType;
    channelId: number;
    courseName: string;
    courseIntro: string;
    trainingGoals: string;
    trainingTarget: string;
    trainingLevelType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep1.trainingLevelType;
    tenantIds: Array<number>;
    categoryIds: Array<number>;
    whiteList?: Array<com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto_WizardStep1>;
    coordinatorId: number;
    coordinatorName: string;
    operatorId: number;
    operatorName: string;
    preRequisiteCourseIds?: Array<number>;
    relatedCourseIds?: Array<number>;
};
export namespace com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep1 {
    export enum wizardStep {
        STEP1 = 'STEP1',
        STEP2 = 'STEP2',
        STEP3 = 'STEP3',
        STEP4 = 'STEP4',
        STEP5 = 'STEP5',
        FULL_UPDATE = 'FULL_UPDATE',
    }
    export enum courseType {
        CLASS = 'CLASS',
        ELEARNING = 'ELEARNING',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
        LINK = 'LINK',
        DEFAULT = 'DEFAULT',
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

