/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep4 = {
    wizardStep: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep4.wizardStep;
    courseType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep4.courseType;
    /**
     * 해당 과정의 사전 학습 과정이 있는지
     */
    isPreRequisiteCourseRequired: boolean;
    /**
     * 과정과 관련된 연관과정을 생성할 지
     */
    isRelatedCourseEnabled: boolean;
    /**
     * 학습자가 댓글 등록이 가능한지
     */
    isCommentEnabled: boolean;
    /**
     * 과정을 학습자가 공유할 수 있는지?
     */
    isSharingAllowed: boolean;
    passMethodType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep4.passMethodType;
    progressMinPassScore: number;
    examMinPassScore: number;
    asgmtMinPassScore: number;
    totalMinPassScore: number;
    progressWeights?: number;
    examWeights?: number;
    asgmtWeights?: number;
    recognizedStudyMinutes?: number;
    isCertificateProvided?: boolean;
    isTextbookProvided?: boolean;
    textbookName?: string;
    textbookFee?: number;
    contentFee?: number;
    textbookPurchaseCost?: number;
    textbookPurchaseAllocationRate?: number;
    contentPurchaseCost?: number;
    contentPurchaseAllocationRatio?: number;
};
export namespace com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep4 {
    export enum wizardStep {
        STEP1 = 'STEP1',
        STEP2 = 'STEP2',
        STEP3 = 'STEP3',
        STEP4 = 'STEP4',
        STEP5 = 'STEP5',
        FULL_UPDATE = 'FULL_UPDATE',
    }
    export enum courseType {
        CLASS = 'CLASS',
        ELEARNING = 'ELEARNING',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
        LINK = 'LINK',
        DEFAULT = 'DEFAULT',
    }
    export enum passMethodType {
        AUTO = 'AUTO',
        MANUAL = 'MANUAL',
    }
}

