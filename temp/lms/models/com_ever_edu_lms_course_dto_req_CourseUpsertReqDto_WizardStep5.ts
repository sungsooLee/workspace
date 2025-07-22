/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_course_dto_req_CourseUpsertReqDto$TagNameWrapper_WizardStep5 } from './com_ever_edu_lms_course_dto_req_CourseUpsertReqDto$TagNameWrapper_WizardStep5';
export type com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep5 = {
    /**
     * 과정 생성/수정 마법사 타입 (lms.course.WizardStep)
     */
    wizardStep: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep5.wizardStep;
    /**
     * 사용 여부
     */
    isUsed: boolean;
    /**
     * 과정 노출 시작일
     */
    courseValidityStartDateTime: string;
    /**
     * 과정 노출 종료일
     */
    courseValidityEndDateTime: string;
    /**
     * 썸네일 이미지 Group UUID
     */
    thumbnailFileGroupUuid: string;
    /**
     * 대표 썸네일 이미지 UUID
     */
    primaryThumbnailFileUuid: string;
    /**
     * AI 과정요약
     */
    courseSummary: string;
    /**
     * 태그 이름 목록
     */
    tagNames: Array<com_ever_edu_lms_course_dto_req_CourseUpsertReqDto$TagNameWrapper_WizardStep5>;
    learningSpaceNameValid?: boolean;
};
export namespace com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep5 {
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

