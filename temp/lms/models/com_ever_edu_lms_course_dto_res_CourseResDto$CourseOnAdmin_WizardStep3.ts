/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin_WizardStep3 = {
    wizardStep?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin_WizardStep3.wizardStep;
    courseId?: number;
    courseType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin_WizardStep3.courseType;
    primaryKitId?: number;
};
export namespace com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin_WizardStep3 {
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
        ELEARNING_SANGSI = 'ELEARNING_SANGSI',
        CLASS = 'CLASS',
        LIVE = 'LIVE',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
    }
}

