/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_res_CourseListResDto$OnAdmin = {
    courseUuid?: string;
    completedWizardStep?: com_ever_edu_lms_course_dto_res_CourseListResDto$OnAdmin.completedWizardStep;
    channelName?: string;
    tenantName?: Array<string>;
    courseType?: com_ever_edu_lms_course_dto_res_CourseListResDto$OnAdmin.courseType;
    courseId?: number;
    courseName?: string;
    coordinatorName?: string;
    operatorName?: string;
    isUsed?: boolean;
    openingYear?: number;
    createdBy?: string;
    previewUrl?: string;
};
export namespace com_ever_edu_lms_course_dto_res_CourseListResDto$OnAdmin {
    export enum completedWizardStep {
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
}

