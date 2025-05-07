/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto_FullUpdate } from './com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto_FullUpdate';
import type { com_ever_edu_lms_course_dto_req_CourseUpsertReqDto$TagNameWrapper_FullUpdate } from './com_ever_edu_lms_course_dto_req_CourseUpsertReqDto$TagNameWrapper_FullUpdate';
export type com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate = {
    wizardStep: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.wizardStep;
    courseType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.courseType;
    courseName: string;
    courseIntro: string;
    trainingGoals: string;
    trainingTarget: string;
    trainingLevelType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.trainingLevelType;
    tenantIds: Array<number>;
    categoryIds: Array<number>;
    whiteList?: Array<com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto_FullUpdate>;
    coordinatorId: number;
    coordinatorName: string;
    operatorId: number;
    operatorName: string;
    isEnrollRequired: boolean;
    approvalLineType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.approvalLineType;
    isMaxEnrollQuotaRestricted?: boolean;
    maxEnrollQuota?: number;
    isWaitListFuncActivated?: boolean;
    waitListAssignType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.waitListAssignType;
    waitListEnrollMethodType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.waitListEnrollMethodType;
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
    bookDeliveryInfoScopeType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.bookDeliveryInfoScopeType;
    /**
     * 수강신청 단계에서 레벨테스트 스케쥴 정보를 받을 지
     */
    isLangLevelTestRequired?: boolean;
    /**
     * 수강신청 단계에서 레벨테스트를 과정마다할 지 차수마다 할 지
     */
    langLevelTestScopeType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.langLevelTestScopeType;
    /**
     * 해당 과정의 사전 학습 과정이 있는지
     */
    isPreRequisiteCourseRequired: boolean;
    preRequisiteCourseIds?: Array<number>;
    /**
     * 과정과 관련된 연관과정을 생성할 지
     */
    isRelatedCourseEnabled: boolean;
    relatedCourseIds?: Array<number>;
    /**
     * 학습자가 댓글 등록이 가능한지
     */
    isCommentEnabled: boolean;
    /**
     * 과정을 학습자가 공유할 수 있는지?
     */
    isSharingAllowed: boolean;
    passMethodType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.passMethodType;
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
    /**
     * 태그 이름 목록
     */
    tagNames: Array<com_ever_edu_lms_course_dto_req_CourseUpsertReqDto$TagNameWrapper_FullUpdate>;
};
export namespace com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate {
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
    export enum trainingLevelType {
        NONE = 'NONE',
        BEGINNER = 'BEGINNER',
        BASIC = 'BASIC',
        INTERMEDIATE = 'INTERMEDIATE',
        ADVANCED = 'ADVANCED',
        EXPERT = 'EXPERT',
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
    export enum passMethodType {
        AUTO = 'AUTO',
        MANUAL = 'MANUAL',
    }
}

