/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto_FullUpdate } from './com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto_FullUpdate';
import type { com_ever_edu_lms_course_dto_req_CourseUpsertReqDto$TagNameWrapper_FullUpdate } from './com_ever_edu_lms_course_dto_req_CourseUpsertReqDto$TagNameWrapper_FullUpdate';
export type com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate = {
    /**
     * 사용 여부
     */
    isUsed: boolean;
    /**
     * 공개 여부
     */
    isPublished: boolean;
    wizardStep: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.wizardStep;
    courseName: string;
    courseSummary: string;
    courseGoal: string;
    courseContent: string;
    trainingTarget: string;
    trainingLevelType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.trainingLevelType;
    tenantIds: Array<number>;
    categoryIds: Array<number>;
    isWhiteList?: boolean;
    whiteList?: Array<com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto_FullUpdate>;
    coordinatorId: number;
    coordinatorName: string;
    coordinatorTelNo: string;
    operatorId: number;
    operatorName: string;
    operatorTelNo: string;
    approvalLineType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.approvalLineType;
    isMaxEnrollQuotaRestricted?: boolean;
    maxEnrollQuota?: number;
    isWaitListFuncActivated?: boolean;
    waitListAssignType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.waitListAssignType;
    waitListEnrollMethodType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.waitListEnrollMethodType;
    maxWaitlistQuota?: number;
    isEnrollCancelDeadLineActivated?: boolean;
    enrollCancelDeadLineDays?: number;
    isDuplicateEnrollAllowed?: boolean;
    isScheduleConflictAllowed?: boolean;
    /**
     * 수강신청 단계에서 배송지 수집을 과정마다할 지 차수마다 할 지 (lms.course.BookDeliveryInfoScopeType)
     */
    bookDeliveryInfoScopeType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.bookDeliveryInfoScopeType;
    /**
     * 수강신청 단계에서 레벨테스트를 과정마다할 지 차수마다 할 지 (lms.course.LangLevelTestScopeType)
     */
    langLevelTestScopeType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.langLevelTestScopeType;
    primaryKitId: number;
    deviceRestrictType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.deviceRestrictType;
    /**
     * (lms.course.LearningRestrictTimeType)
     */
    learningRestrictTimeType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.learningRestrictTimeType;
    /**
     * 1일 진도 제한
     */
    isDailyLearningProgressRestricted: boolean;
    maxDailyLearningProgress?: number;
    /**
     * 진도 초기화 여부
     */
    isProgressResetEnabled: boolean;
    /**
     * 커리큘럼 순차 학습 적용 여부
     */
    isSequentialLearningRequired: boolean;
    /**
     * 플레이어 탐색바 제한 여부
     */
    isPlayerControlRestricted: boolean;
    /**
     * (cms.video.PlayBackRate)
     */
    maxPlayBackRate?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.maxPlayBackRate;
    /**
     * 복습 제한 여부
     */
    isReviewRestricted: boolean;
    maxReviewPeriodMonths?: number;
    /**
     * 캡처 방지 여부
     */
    isCaptureBlockEnabled: boolean;
    /**
     * 사내망 제어 여부
     */
    isIntranetRestricted: boolean;
    /**
     * 보안 서약 여부
     */
    isSecurityAgreementEnable: boolean;
    /**
     * (lms.course.LearningSpaceType)
     */
    learningSpaceType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.learningSpaceType;
    preRequisiteCourseIds?: Array<number>;
    relatedCourseIds?: Array<number>;
    /**
     * 학습자가 댓글 등록이 가능한지
     */
    isCommentEnabled: boolean;
    /**
     * 과정을 학습자가 공유할 수 있는지?
     */
    isSharingAllowed: boolean;
    /**
     * (lms.course.PassMethodType)
     */
    passMethodType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.passMethodType;
    progressMinPassScore: number;
    examMinPassScore: number;
    asgmtMinPassScore: number;
    totalMinPassScore: number;
    progressWeights?: number;
    examWeights?: number;
    asgmtWeights?: number;
    recognizedStudyMinutes?: number;
    isRecognizedStudyPoint?: boolean;
    recognizedStudyPoint?: number;
    isCertificateProvided?: boolean;
    isTextbookProvided?: boolean;
    textbookName?: string;
    textbookFee?: number;
    contentFee?: number;
    textbookPurchaseCost?: number;
    textbookPurchaseAllocationRate?: number;
    contentPurchaseCost?: number;
    contentPurchaseAllocationRatio?: number;
    thumbnailFileGroupId?: number;
    primaryThumbnailFileId?: number;
    /**
     * 태그 이름 목록
     */
    tagNames: Array<com_ever_edu_lms_course_dto_req_CourseUpsertReqDto$TagNameWrapper_FullUpdate>;
    courseValidityStartDate: string;
    courseValidityEndDate: string;
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
     * 수강신청 단계에서 배송지 수집을 과정마다할 지 차수마다 할 지 (lms.course.BookDeliveryInfoScopeType)
     */
    export enum bookDeliveryInfoScopeType {
        NONE = 'NONE',
        PER_COURSE = 'PER_COURSE',
        PER_SEQ = 'PER_SEQ',
    }
    /**
     * 수강신청 단계에서 레벨테스트를 과정마다할 지 차수마다 할 지 (lms.course.LangLevelTestScopeType)
     */
    export enum langLevelTestScopeType {
        NONE = 'NONE',
        PER_COURSE = 'PER_COURSE',
        PER_SEQ = 'PER_SEQ',
    }
    export enum deviceRestrictType {
        NONE = 'NONE',
        PC = 'PC',
        MOBILE = 'MOBILE',
    }
    /**
     * (lms.course.LearningRestrictTimeType)
     */
    export enum learningRestrictTimeType {
        NONE = 'NONE',
        WORK_HOURS = 'WORK_HOURS',
        OFF_HOURS = 'OFF_HOURS',
    }
    /**
     * (cms.video.PlayBackRate)
     */
    export enum maxPlayBackRate {
        X1_25 = 'X1_25',
        X1_5 = 'X1_5',
        X1_75 = 'X1_75',
        X2 = 'X2',
    }
    /**
     * (lms.course.LearningSpaceType)
     */
    export enum learningSpaceType {
        EXTERNAL_SITE = 'EXTERNAL_SITE',
        LEARNING_WAY = 'LEARNING_WAY',
        FACE_TO_FACE = 'FACE_TO_FACE',
        NONE_FACE_TO_FACE = 'NONE_FACE_TO_FACE',
    }
    /**
     * (lms.course.PassMethodType)
     */
    export enum passMethodType {
        AUTO = 'AUTO',
        MANUAL = 'MANUAL',
    }
}

