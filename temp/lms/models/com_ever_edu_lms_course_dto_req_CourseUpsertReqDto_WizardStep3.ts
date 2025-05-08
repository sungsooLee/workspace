/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep3 = {
    wizardStep: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep3.wizardStep;
    courseType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep3.courseType;
    isEnrollRequired: boolean;
    approvalLineType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep3.approvalLineType;
    isMaxEnrollQuotaRestricted?: boolean;
    maxEnrollQuota?: number;
    isWaitListFuncActivated?: boolean;
    waitListAssignType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep3.waitListAssignType;
    waitListEnrollMethodType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep3.waitListEnrollMethodType;
    maxWaitlistQuota?: number;
    enrollCancelDeadLineDays?: number;
    isDuplicateEnrollAllowed?: boolean;
    /**
     * 수강신청 단계에서 배송지 정보를 받을 지
     */
    isBookDeliveryInfoRequired?: boolean;
    /**
     * 수강신청 단계에서 배송지 수집을 과정마다할 지 차수마다 할 지
     */
    bookDeliveryInfoScopeType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep3.bookDeliveryInfoScopeType;
    /**
     * 수강신청 단계에서 레벨테스트 스케쥴 정보를 받을 지
     */
    isLangLevelTestRequired?: boolean;
    /**
     * 수강신청 단계에서 레벨테스트를 과정마다할 지 차수마다 할 지
     */
    langLevelTestScopeType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep3.langLevelTestScopeType;
};
export namespace com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep3 {
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
        PER_COURSE = 'PER_COURSE',
        PER_SESSION = 'PER_SESSION',
    }
    /**
     * 수강신청 단계에서 레벨테스트를 과정마다할 지 차수마다 할 지
     */
    export enum langLevelTestScopeType {
        PER_COURSE = 'PER_COURSE',
        PER_SESSION = 'PER_SESSION',
    }
}

