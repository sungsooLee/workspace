/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStepNew = {
    courseType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStepNew.courseType;
    channelId: number;
    tenantIds: Array<number>;
    primaryCategoryId: number;
    categoryIds: Array<number>;
    whiteListIds?: Array<number>;
    language: string;
    courseName: string;
    courseSummary: string;
    courseContent: string;
    trainingLevelType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStepNew.trainingLevelType;
    /**
     * (lms.course.LearningSpaceType)
     */
    learningSpaceType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStepNew.learningSpaceType;
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
};
export namespace com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStepNew {
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
    /**
     * (lms.course.LearningSpaceType)
     */
    export enum learningSpaceType {
        LEARNING_WAY = 'LEARNING_WAY',
        REGISTERED = 'REGISTERED',
        MANUAL = 'MANUAL',
    }
}

