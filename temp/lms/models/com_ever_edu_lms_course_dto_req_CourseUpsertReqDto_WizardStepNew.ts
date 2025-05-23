/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto_WizardStepNew } from './com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto_WizardStepNew';
export type com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStepNew = {
    courseType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStepNew.courseType;
    language: string;
    channelId: number;
    courseName: string;
    courseSummary: string;
    courseGoal: string;
    courseContent: string;
    trainingTarget: string;
    trainingLevelType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStepNew.trainingLevelType;
    tenantIds: Array<number>;
    primaryCategoryId: number;
    categoryIds: Array<number>;
    whiteList?: Array<com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto_WizardStepNew>;
    coordinatorId: number;
    coordinatorName: string;
    coordinatorTelNo: string;
    operatorId: number;
    operatorName: string;
    operatorTelNo: string;
};
export namespace com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStepNew {
    export enum courseType {
        ELEARNING = 'ELEARNING',
        ELEARNING_SANGSI = 'ELEARNING_SANGSI',
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

