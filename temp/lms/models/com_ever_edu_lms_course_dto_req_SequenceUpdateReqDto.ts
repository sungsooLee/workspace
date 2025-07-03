/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_req_SequenceUpdateReqDto = {
    /**
     * 사용 여부
     */
    isUsed?: boolean;
    /**
     * 공개 여부
     */
    isPublished?: boolean;
    courseSequenceName: string;
    enrollStartDate?: string;
    enrollEndDate?: string;
    learningStartType?: com_ever_edu_lms_course_dto_req_SequenceUpdateReqDto.learningStartType;
    learningStartDate?: string;
    learningEndDate?: string;
    learningStartDays?: number;
    maxEnrollQuota?: number;
    maxWaitlistQuota?: number;
    isEnrollCancelDeadLineActivated?: boolean;
    enrollCancelDeadLineDays?: number;
    primaryCurriculumId: number;
    deviceRestrictType?: com_ever_edu_lms_course_dto_req_SequenceUpdateReqDto.deviceRestrictType;
    /**
     * (lms.course.LearningRestrictTimeType)
     */
    learningRestrictTimeType?: com_ever_edu_lms_course_dto_req_SequenceUpdateReqDto.learningRestrictTimeType;
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
    /**
     * (cms.video.PlayBackRate)
     */
    maxPlayBackRate?: com_ever_edu_lms_course_dto_req_SequenceUpdateReqDto.maxPlayBackRate;
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
    /**
     * (lms.course.LearningSpaceType)
     */
    learningSpaceType?: com_ever_edu_lms_course_dto_req_SequenceUpdateReqDto.learningSpaceType;
    /**
     * (lms.course.PassMethodType)
     */
    passMethodType?: com_ever_edu_lms_course_dto_req_SequenceUpdateReqDto.passMethodType;
    attendanceMinPassScore?: number;
    progressMinPassScore?: number;
    examMinPassScore?: number;
    asgmtMinPassScore: number;
    totalMinPassScore?: number;
    attendanceWeights?: number;
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
export namespace com_ever_edu_lms_course_dto_req_SequenceUpdateReqDto {
    export enum learningStartType {
        FIXED_DATE = 'FIXED_DATE',
        DAYS_AFTER_ENROLL = 'DAYS_AFTER_ENROLL',
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
        LEARNING_WAY = 'LEARNING_WAY',
        REGISTERED = 'REGISTERED',
        MANUAL = 'MANUAL',
    }
    /**
     * (lms.course.PassMethodType)
     */
    export enum passMethodType {
        AUTO = 'AUTO',
        MANUAL = 'MANUAL',
    }
}

