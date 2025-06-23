/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep1 = {
    wizardStep: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep1.wizardStep;
    channelId: number;
    tenantIds: Array<number>;
    primaryCategoryId: number;
    categoryIds: Array<number>;
    whiteListIds?: Array<number>;
    language: string;
    courseName: string;
    courseSummary: string;
    courseContent: string;
    trainingLevelType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep1.trainingLevelType;
    /**
     * (lms.course.LearningSpaceType)
     */
    learningSpaceType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep1.learningSpaceType;
    learningSpaceId?: number;
    learningSpaceName?: string;
    coordinatorId: number;
    coordinatorName: string;
    coordinatorDeptName: string;
    coordinatorTelNo: string;
    coordinatorEmail: string;
    operatorId: number;
    operatorName: string;
    operatorDeptName: string;
    operatorTelNo: string;
    operatorEmail: string;
    instructorId?: number;
    tutorId?: number;
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
    export enum trainingLevelType {
        NONE = 'NONE',
        BEGINNER = 'BEGINNER',
        BASIC = 'BASIC',
        INTERMEDIATE = 'INTERMEDIATE',
        ADVANCED = 'ADVANCED',
        EXPERT = 'EXPERT',
    }
    /**
     * (lms.course.LearningSpaceType)
     */
    export enum learningSpaceType {
        LEARNING_WAY = 'LEARNING_WAY',
        REGISTERED = 'REGISTERED',
        MANUAL = 'MANUAL',
    }
}

