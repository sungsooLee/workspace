/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep2 = {
    wizardStep: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep2.wizardStep;
    courseType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep2.courseType;
    courseSubType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep2.courseSubType;
};
export namespace com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep2 {
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
        PACKAGE = 'PACKAGE',
    }
    export enum courseSubType {
        SANGSI_LEARN = 'SANGSI_LEARN',
        NORMAL = 'NORMAL',
        SANGSI_ENROLL = 'SANGSI_ENROLL',
        FACE_TO_FACE = 'FACE_TO_FACE',
        NONE_FACE_TO_FACE = 'NONE_FACE_TO_FACE',
        HYBRID = 'HYBRID',
        LIVE = 'LIVE',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
    }
}

