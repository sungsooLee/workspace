/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto } from './com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto';
import type { com_ever_edu_lms_category_dto_res_CourseCategoryFlatDto } from './com_ever_edu_lms_category_dto_res_CourseCategoryFlatDto';
import type { com_ever_edu_lms_course_dto_res_CourseResDto$SimpleCourseDto } from './com_ever_edu_lms_course_dto_res_CourseResDto$SimpleCourseDto';
import type { com_ever_edu_lms_course_dto_res_CourseResDto$TagNameWrapper } from './com_ever_edu_lms_course_dto_res_CourseResDto$TagNameWrapper';
export type com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin = {
    /**
     * 사용 여부
     */
    isUsed?: boolean;
    /**
     * 공개 여부
     */
    isPublished?: boolean;
    wizardStep?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.wizardStep;
    courseId?: number;
    courseType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.courseType;
    language?: string;
    channelId?: number;
    courseName?: string;
    courseSummary?: string;
    courseGoal?: string;
    courseContent?: string;
    trainingTarget?: string;
    trainingLevelType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.trainingLevelType;
    tenantIds?: Array<number>;
    primaryCategoryId?: number;
    /**
     * 카테고리 경로 노출
     */
    categories?: Array<com_ever_edu_lms_category_dto_res_CourseCategoryFlatDto>;
    whiteList?: Array<com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto>;
    coordinatorId?: number;
    coordinatorTelNo?: string;
    operatorId?: number;
    operatorTelNo?: string;
    isEnrollRequired?: boolean;
    approvalLineType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.approvalLineType;
    isMaxEnrollQuotaRestricted?: boolean;
    maxEnrollQuota?: number;
    isWaitListFuncActivated?: boolean;
    waitListPickMethodType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.waitListPickMethodType;
    maxWaitlistQuota?: number;
    isEnrollCancelDeadLineActivated?: boolean;
    enrollCancelDeadLineDays?: number;
    isDuplicateEnrollAllowed?: boolean;
    /**
     * 수강신청 단계에서 배송지 수집 여부
     */
    isBookDeliveryInfoRequired?: boolean;
    /**
     * 수강신청 단계에서 레벨테스트 수행 여부
     */
    isLangLevelTestRequired?: boolean;
    primaryCurriculumId?: number;
    hasConfigLearnControl?: boolean;
    deviceRestrictType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.deviceRestrictType;
    learningRestrictTimeType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.learningRestrictTimeType;
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
    maxPlayBackRate?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.maxPlayBackRate;
    /**
     * 복습 제한 여부
     */
    isReviewRestricted?: boolean;
    maxReviewPeriodMonths?: number;
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
    learningSpaceType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.learningSpaceType;
    preRequisiteCourse?: Array<com_ever_edu_lms_course_dto_res_CourseResDto$SimpleCourseDto>;
    relatedCourse?: Array<com_ever_edu_lms_course_dto_res_CourseResDto$SimpleCourseDto>;
    /**
     * 학습자가 댓글 등록이 가능한지
     */
    isCommentEnabled?: boolean;
    /**
     * 과정을 학습자가 공유할 수 있는지?
     */
    isSharingAllowed?: boolean;
    passMethodType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.passMethodType;
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
    thumbnailFileGroupId?: number;
    primaryThumbnailFileId?: number;
    /**
     * 태그 이름 목록
     */
    tagNames?: Array<com_ever_edu_lms_course_dto_res_CourseResDto$TagNameWrapper>;
    courseValidityStartDate?: string;
    courseValidityStartHour?: number;
    courseValidityEndDate?: string;
    courseValidityEndHour?: number;
};
export namespace com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin {
    export enum wizardStep {
        STEP1 = 'STEP1',
        STEP2 = 'STEP2',
        STEP3 = 'STEP3',
        STEP4 = 'STEP4',
        STEP5 = 'STEP5',
        FULL_UPDATE = 'FULL_UPDATE',
    }
    export enum courseType {
        ELEARNING1 = 'ELEARNING1',
        ELEARNING2 = 'ELEARNING2',
        CLASS = 'CLASS',
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
    export enum waitListPickMethodType {
        NONE = 'NONE',
        AUTO = 'AUTO',
        MANUAL = 'MANUAL',
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
        LEARNING_WAY = 'LEARNING_WAY',
        REGISTERED = 'REGISTERED',
        MANUAL = 'MANUAL',
    }
    export enum passMethodType {
        AUTO = 'AUTO',
        MANUAL = 'MANUAL',
    }
}

