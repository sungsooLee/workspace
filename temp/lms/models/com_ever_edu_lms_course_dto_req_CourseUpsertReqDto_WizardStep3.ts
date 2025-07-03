/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep3 = {
    /**
     * 과정 생성/수정 마법사 타입 (lms.course.WizardStep)
     */
    wizardStep: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep3.wizardStep;
    /**
     * 대표 커리큘럼id
     */
    primaryCurriculumId: number;
    /**
     * 위탁 소유 회사 ID
     */
    outsourcingCompanyId?: number;
    /**
     * 위탁 소유 회사 이름
     */
    outsourcingCompanyName?: string;
};
export namespace com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep3 {
    /**
     * 과정 생성/수정 마법사 타입 (lms.course.WizardStep)
     */
    export enum wizardStep {
        STEP1 = 'STEP1',
        STEP2 = 'STEP2',
        STEP3 = 'STEP3',
        STEP4 = 'STEP4',
        STEP5 = 'STEP5',
        FULL_UPDATE = 'FULL_UPDATE',
    }
}

