/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_req_CoursePrimaryCurriculumReqDto = {
    /**
     * 과정 생성/수정 마법사 타입 (lms.course.WizardStep)
     */
    wizardStep: com_ever_edu_lms_course_dto_req_CoursePrimaryCurriculumReqDto.wizardStep;
    /**
     * 복사한 원본 커리큘럼 ID
     */
    curriculumId?: number;
};
export namespace com_ever_edu_lms_course_dto_req_CoursePrimaryCurriculumReqDto {
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

