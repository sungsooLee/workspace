/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto } from './com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto';
export type com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnUser = {
    /**
     * 사용 여부
     */
    isUsed?: boolean;
    /**
     * 공개 여부
     */
    isPublished?: boolean;
    wizardStep?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnUser.wizardStep;
    courseType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnUser.courseType;
    courseSubType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnUser.courseSubType;
    channelId?: number;
    courseName?: string;
    courseSummary?: string;
    courseGoal?: string;
    courseContent?: string;
    trainingTarget?: string;
    trainingLevelType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnUser.trainingLevelType;
    tenantIds?: Array<number>;
    categoryIds?: Array<number>;
    whiteList?: Array<com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto>;
    coordinatorId?: number;
    coordinatorName?: string;
    operatorId?: number;
    operatorName?: string;
    isEnrollRequired?: boolean;
    approvalLineType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnUser.approvalLineType;
    isMaxEnrollQuotaRestricted?: boolean;
    maxEnrollQuota?: number;
    isWaitListFuncActivated?: boolean;
    waitListAssignType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnUser.waitListAssignType;
    waitListEnrollMethodType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnUser.waitListEnrollMethodType;
    maxWaitlistQuota?: number;
    isEnrollCancelDeadLineActivated?: boolean;
    enrollCancelDeadLineDays?: number;
    isDuplicateEnrollAllowed?: boolean;
    isScheduleConflictAllowed?: boolean;
    /**
     * 수강신청 단계에서 배송지 수집을 과정마다할 지 차수마다 할 지
     */
    bookDeliveryInfoScopeType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnUser.bookDeliveryInfoScopeType;
    /**
     * 수강신청 단계에서 레벨테스트를 과정마다할 지 차수마다 할 지
     */
    langLevelTestScopeType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnUser.langLevelTestScopeType;
    deviceRestrictType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnUser.deviceRestrictType;
    learningRestrictTimeType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnUser.learningRestrictTimeType;
    /**
     * 1일 진도 제한
     */
    isDailyLearningProgressRestricted?: boolean;
    maxDailyLearningProgress?: number;
    /**
     * 진도 초기화 여부
     */
    isProgressResetEnabled?: boolean;
    /**
     * 커리큘럼 순차 학습 적용 여부
     */
    isSequentialLearningRequired?: boolean;
    /**
     * 플레이어 탐색바 제한 여부
     */
    isPlayerControlRestricted?: boolean;
    maxPlayBackRate?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnUser.maxPlayBackRate;
    /**
     * 복습 제한 여부
     */
    isReviewRestricted?: boolean;
    maxReviewPeriod?: number;
    /**
     * 캡처 방지 여부
     */
    isCaptureBlockEnabled?: boolean;
    /**
     * 사내망 제어 여부
     */
    isIntranetRestricted?: boolean;
    /**
     * 보안 서약 여부
     */
    isSecurityAgreementEnable?: boolean;
    learningSpaceType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnUser.learningSpaceType;
    preRequisiteCourseIds?: Array<number>;
    relatedCourseIds?: Array<number>;
    /**
     * 학습자가 댓글 등록이 가능한지
     */
    isCommentEnabled?: boolean;
    /**
     * 과정을 학습자가 공유할 수 있는지?
     */
    isSharingAllowed?: boolean;
    passMethodType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnUser.passMethodType;
    progressMinPassScore?: number;
    examMinPassScore?: number;
    asgmtMinPassScore?: number;
    totalMinPassScore?: number;
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
};
export namespace com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnUser {
    export enum wizardStep {
        STEP1 = 'STEP1',
        STEP2 = 'STEP2',
        STEP3 = 'STEP3',
        STEP4 = 'STEP4',
        STEP5 = 'STEP5',
        FULL_UPDATE = 'FULL_UPDATE',
    }
    export enum courseType {
        ELEARNING = 'ELEARNING',
        CLASS = 'CLASS',
        LIVE = 'LIVE',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
        PACKAGE = 'PACKAGE',
    }
    export enum courseSubType {
        SANGSI_LEARN = 'SANGSI_LEARN',
        NORMAL = 'NORMAL',
        SANGSI_ENROLL = 'SANGSI_ENROLL',
        FACE_TO_FACE = 'FACE_TO_FACE',
        NONE_FACE_TO_FACE = 'NONE_FACE_TO_FACE',
        HYBRID = 'HYBRID',
        LIVE = 'LIVE',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
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
    export enum deviceRestrictType {
        NONE = 'NONE',
        PC = 'PC',
        MOBILE = 'MOBILE',
    }
    export enum learningRestrictTimeType {
        NONE = 'NONE',
        WORK_HOURS = 'WORK_HOURS',
        OFF_HOURS = 'OFF_HOURS',
    }
    export enum maxPlayBackRate {
        X1_25 = 'X1_25',
        X1_5 = 'X1_5',
        X1_75 = 'X1_75',
        X2 = 'X2',
    }
    export enum learningSpaceType {
        EXTERNAL_SITE = 'EXTERNAL_SITE',
        LEARNING_WAY = 'LEARNING_WAY',
        FACE_TO_FACE = 'FACE_TO_FACE',
        NONE_FACE_TO_FACE = 'NONE_FACE_TO_FACE',
    }
    export enum passMethodType {
        AUTO = 'AUTO',
        MANUAL = 'MANUAL',
    }
}

