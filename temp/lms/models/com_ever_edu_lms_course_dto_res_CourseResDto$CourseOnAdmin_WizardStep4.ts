/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_lms_course_dto_res_CourseResDto$SimpleCourseDto_WizardStep4 } from './com_ever_edu_lms_course_dto_res_CourseResDto$SimpleCourseDto_WizardStep4';
export type com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin_WizardStep4 = {
    wizardStep?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin_WizardStep4.wizardStep;
    courseId?: number;
    courseType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin_WizardStep4.courseType;
    hasConfigLearnControl?: boolean;
    deviceRestrictType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin_WizardStep4.deviceRestrictType;
    learningRestrictTimeType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin_WizardStep4.learningRestrictTimeType;
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
    maxPlayBackRate?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin_WizardStep4.maxPlayBackRate;
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
    learningSpaceType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin_WizardStep4.learningSpaceType;
    preRequisiteCourse?: Array<com_ever_edu_lms_course_dto_res_CourseResDto$SimpleCourseDto_WizardStep4>;
    relatedCourse?: Array<com_ever_edu_lms_course_dto_res_CourseResDto$SimpleCourseDto_WizardStep4>;
    /**
     * 학습자가 댓글 등록이 가능한지
     */
    isCommentEnabled?: boolean;
    /**
     * 과정을 학습자가 공유할 수 있는지?
     */
    isSharingAllowed?: boolean;
    passMethodType?: com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin_WizardStep4.passMethodType;
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
export namespace com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin_WizardStep4 {
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
        ELEARNING_SANGSI = 'ELEARNING_SANGSI',
        CLASS = 'CLASS',
        LIVE = 'LIVE',
        EXAM = 'EXAM',
        SURVEY = 'SURVEY',
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

