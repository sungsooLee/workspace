/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_course_dto_req_CourseUpsertReqDto$TagNameWrapper_WizardStep5 } from './com_ever_edu_lms_course_dto_req_CourseUpsertReqDto$TagNameWrapper_WizardStep5';
export type com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep5 = {
    wizardStep: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep5.wizardStep;
    thumbnailFileGroupUuid?: number;
    primaryThumbnailFileUuid?: number;
    /**
     * 태그 이름 목록
     */
    tagNames: Array<com_ever_edu_lms_course_dto_req_CourseUpsertReqDto$TagNameWrapper_WizardStep5>;
    /**
     * 사용 여부
     */
    isUsed: boolean;
    courseValidityStartDate: string;
    courseValidityEndDate: string;
};
export namespace com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep5 {
    export enum wizardStep {
        STEP1 = 'STEP1',
        STEP2 = 'STEP2',
        STEP3 = 'STEP3',
        STEP4 = 'STEP4',
        STEP5 = 'STEP5',
        FULL_UPDATE = 'FULL_UPDATE',
    }
}

