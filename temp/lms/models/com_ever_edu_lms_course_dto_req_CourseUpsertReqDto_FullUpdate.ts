/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_course_dto_req_CourseUpsertReqDto$TagNameWrapper_FullUpdate } from './com_ever_edu_lms_course_dto_req_CourseUpsertReqDto$TagNameWrapper_FullUpdate';
export type com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate = {
    wizardStep: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.wizardStep;
    language: string;
    courseName: string;
    courseSummary: string;
    courseContent: string;
    trainingLevelType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.trainingLevelType;
    /**
     * (lms.course.LearningSpaceType)
     */
    learningSpaceType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.learningSpaceType;
    spaceId?: number;
    spaceName?: string;
    coordinatorId: number;
    coordinatorName: string;
    coordinatorTelNo: string;
    operatorId: number;
    operatorName: string;
    operatorTelNo: string;
    tenantIds: Array<number>;
    primaryCategoryId: number;
    categoryIds: Array<number>;
    whiteListIds?: Array<number>;
    approvalLineType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.approvalLineType;
    isMaxEnrollQuotaRestricted?: boolean;
    maxEnrollQuota?: number;
    waitListPickMethodType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.waitListPickMethodType;
    maxWaitlistQuota?: number;
    isEnrollCancelDeadLineActivated?: boolean;
    enrollCancelDeadLineDays?: number;
    isDuplicateEnrollAllowed?: boolean;
    /**
     * 수강신청 단계에서 배송지 수집 여부
     */
    isBookDeliveryInfoRequired?: boolean;
    /**
     * 수강신청 단계에서 레벨테스트 수집 여부
     */
    isLangLevelTestRequired?: boolean;
    primaryCurriculumId: number;
    isLearnEnvEnabled?: boolean;
    deviceRestrictType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.deviceRestrictType;
    /**
     * 사내망 제어 여부
     */
    isIntranetRestricted: boolean;
    /**
     * (lms.course.LearningRestrictTimeType)
     */
    learningRestrictTimeType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.learningRestrictTimeType;
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
     * 보안 서약 여부
     */
    isSecurityAgreementEnable: boolean;
    isLearnControlEnabled?: boolean;
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
     * (lms.course.PassMethodType)
     */
    passMethodType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.passMethodType;
    attendanceMinPassScore: number;
    progressMinPassScore: number;
    examMinPassScore: number;
    asgmtMinPassScore: number;
    totalMinPassScore: number;
    attendanceWeights?: number;
    progressWeights?: number;
    examWeights?: number;
    asgmtWeights?: number;
    /**
     * (lms.course.RecognizedStudyMinType)
     */
    recognizedStudyMinType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.recognizedStudyMinType;
    recognizedStudyCycles?: number;
    recognizedStudyMinutes?: number;
    isRecognizedStudyPoint?: boolean;
    recognizedStudyPoint?: number;
    isCertificateProvided?: boolean;
    /**
     * 커뮤니티[공지/자료실/커뮤니티/공유] 기능을 사용 할 지 말지
     */
    isCommunicationToolEnabled: boolean;
    /**
     * 공지사항 기능을 사용 할 지 말지
     */
    isNoticeEnabled: boolean;
    /**
     * Q&A 기능을 사용 할 지 말지
     */
    isQnaBoardEnabled: boolean;
    /**
     * 자료실 기능을 사용 할 지 말지
     */
    isMartialBoardEnabled: boolean;
    /**
     * 커뮤니티 기능을 사용 할 지 말지
     */
    isCommunityEnabled: boolean;
    /**
     * 과정을 학습자가 공유할 수 있는지?
     */
    isSharingAllowed: boolean;
    isInstructorAssigned: boolean;
    /**
     * (lms.course.InstructorAssignType)
     */
    instructorAssignType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_FullUpdate.instructorAssignType;
    instructorId?: number;
    instructorName?: string;
    tutorId?: number;
    isTextbookProvided: boolean;
    textbookName?: string;
    textbookFee?: number;
    isRelatedPrerequisiteCourseExisted: boolean;
    preRequisiteCourseIds?: Array<number>;
    relatedCourseIds?: Array<number>;
    contentFee?: number;
    textbookPurchaseCost?: number;
    textbookPurchaseAllocationRate?: number;
    contentPurchaseCost?: number;
    contentPurchaseAllocationRatio?: number;
    thumbnailFileGroupUuid?: number;
    primaryThumbnailFileUuid?: number;
    /**
     * 태그 이름 목록
     */
    tagNames: Array<com_ever_edu_lms_course_dto_req_CourseUpsertReqDto$TagNameWrapper_FullUpdate>;
    /**
     * 사용 여부
     */
    isUsed: boolean;
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
    /**
     * (lms.course.LearningSpaceType)
     */
    export enum learningSpaceType {
        LEARNING_WAY = 'LEARNING_WAY',
        REGISTERED = 'REGISTERED',
        MANUAL = 'MANUAL',
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
     * (lms.course.PassMethodType)
     */
    export enum passMethodType {
        AUTO = 'AUTO',
        MANUAL = 'MANUAL',
    }
    /**
     * (lms.course.RecognizedStudyMinType)
     */
    export enum recognizedStudyMinType {
        IMPOSSIBLE = 'IMPOSSIBLE',
        MANDATORY = 'MANDATORY',
        OPTIONAL = 'OPTIONAL',
    }
    /**
     * (lms.course.InstructorAssignType)
     */
    export enum instructorAssignType {
        REGISTERED = 'REGISTERED',
        MANUAL = 'MANUAL',
    }
}

