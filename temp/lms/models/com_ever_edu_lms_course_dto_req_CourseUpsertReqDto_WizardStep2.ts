/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep2 = {
    wizardStep: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep2.wizardStep;
    isEnrollRequired: boolean;
    approvalLineType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep2.approvalLineType;
    isMaxEnrollQuotaRestricted?: boolean;
    maxEnrollQuota?: number;
    isWaitListFuncActivated?: boolean;
    waitListAssignType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep2.waitListAssignType;
    waitListEnrollMethodType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep2.waitListEnrollMethodType;
    maxWaitlistQuota?: number;
    isEnrollCancelDeadLineActivated?: boolean;
    enrollCancelDeadLineDays?: number;
    isDuplicateEnrollAllowed?: boolean;
    isScheduleConflictAllowed?: boolean;
    /**
     * 수강신청 단계에서 배송지 수집을 과정마다할 지 차수마다 할 지
     */
    bookDeliveryInfoScopeType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep2.bookDeliveryInfoScopeType;
    /**
     * 수강신청 단계에서 레벨테스트를 과정마다할 지 차수마다 할 지
     */
    langLevelTestScopeType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep2.langLevelTestScopeType;
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
    export enum approvalLineType {
        NONE = 'NONE',
        LEADER = 'LEADER',
        OPERATOR = 'OPERATOR',
        LEADER_OPERATOR = 'LEADER_OPERATOR',
        DEPEND_COMPANY = 'DEPEND_COMPANY',
    }
    export enum waitListAssignType {
        PERCENTAGE = 'PERCENTAGE',
        FIXED_COUNT = 'FIXED_COUNT',
    }
    export enum waitListEnrollMethodType {
        ADMIN_PUSH = 'ADMIN_PUSH',
        MAIL_SEND = 'MAIL_SEND',
    }
    /**
     * 수강신청 단계에서 배송지 수집을 과정마다할 지 차수마다 할 지
     */
    export enum bookDeliveryInfoScopeType {
        NONE = 'NONE',
        PER_COURSE = 'PER_COURSE',
        PER_SEQ = 'PER_SEQ',
    }
    /**
     * 수강신청 단계에서 레벨테스트를 과정마다할 지 차수마다 할 지
     */
    export enum langLevelTestScopeType {
        NONE = 'NONE',
        PER_COURSE = 'PER_COURSE',
        PER_SEQ = 'PER_SEQ',
    }
}

