/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep4 = {
    /**
     * 과정 생성/수정 마법사 타입 (lms.course.WizardStep)
     */
    wizardStep: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep4.wizardStep;
    /**
     * 학습 환경 설정 여부
     */
    isLearnEnvEnabled?: boolean;
    /**
     * 기기 제한
     */
    deviceRestrictType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep4.deviceRestrictType;
    /**
     * 네트워크 제한(사내망 제어 여부)
     */
    isIntranetRestricted: boolean;
    /**
     * (lms.course.LearningRestrictTimeType)
     */
    learningRestrictTimeType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep4.learningRestrictTimeType;
    /**
     * 복습 제한 여부
     */
    isReviewRestricted: boolean;
    /**
     * 복습 가능 기간(개월)
     */
    maxReviewPeriodMonths?: number;
    /**
     * 캡처 방지 여부
     */
    isCaptureBlockEnabled: boolean;
    /**
     * 보안 서약 여부
     */
    isSecurityAgreementEnable: boolean;
    /**
     * 학습 제어 설정 여부
     */
    isLearnControlEnabled?: boolean;
    /**
     * 1일 진도 제한
     */
    isDailyLearningProgressRestricted: boolean;
    /**
     * 1일 진도 제한(%)
     */
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
     * 동영상 탐색바 제한 여부
     */
    isPlayerControlRestricted: boolean;
    /**
     * (cms.video.PlayBackRate)
     */
    maxPlayBackRate?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep4.maxPlayBackRate;
    /**
     * 이수기준 설정 여부
     */
    isUsePassOption?: boolean;
    /**
     * (lms.course.PassMethodType)
     */
    passMethodType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep4.passMethodType;
    /**
     * 수료증 제공 여부
     */
    isCertificateProvided?: boolean;
    /**
     * 항목별 이수 기준 (진도)
     */
    progressMinPassScore: number;
    /**
     * 항목별 이수 기준 (출석)
     */
    attendanceMinPassScore: number;
    /**
     * 항목별 이수 기준 (평가)
     */
    examMinPassScore: number;
    /**
     * 항목별 이수 기준 (과제)
     */
    asgmtMinPassScore: number;
    /**
     * 항목별 이수 기준 (총점)
     */
    totalMinPassScore: number;
    /**
     * 반영 비율 (진도)
     */
    progressWeights?: number;
    /**
     * 반영 비율 (출석)
     */
    attendanceWeights?: number;
    /**
     * 반영 비율 (시험)
     */
    examWeights?: number;
    /**
     * 반영 비율 (과제)
     */
    asgmtWeights?: number;
    /**
     * (lms.course.RecognizedStudyMinType)
     */
    recognizedStudyMinType?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep4.recognizedStudyMinType;
    /**
     * 인정 학습 횟수
     */
    recognizedStudyCycles?: number;
    /**
     * 인정학습시간(분)
     */
    recognizedStudyMinutes?: number;
    /**
     * 학습포인트 여부
     */
    isRecognizedStudyPoint?: boolean;
    /**
     * 인정학습점수(학습포인트)
     */
    recognizedStudyPoint?: number;
    /**
     * 커뮤니티[공지/자료실/커뮤니티/공유] 설정 여부
     */
    isCommunicationToolEnabled: boolean;
    /**
     * 공지사항 기능 사용 여부
     */
    isNoticeEnabled: boolean;
    /**
     * Q&A 기능 사용 여부
     */
    isQnaBoardEnabled: boolean;
    /**
     * 자료실 기능 사용 여부
     */
    isMartialBoardEnabled: boolean;
    /**
     * 커뮤니티 기능 사용 여부
     */
    isCommunityEnabled: boolean;
    /**
     * 과정을 학습자가 공유할 수 있는지?
     */
    isSharingAllowed: boolean;
    /**
     * 강사 설정 여부
     */
    isInstructorAssigned: boolean;
    /**
     * (lms.course.InstructorAssignType)
     */
    instructorAssignType: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep4.instructorAssignType;
    /**
     * 강사 직접입력
     */
    instructorName?: string;
    /**
     * 교재 설정 여부
     */
    isTextbookProvided: boolean;
    /**
     * 교재명
     */
    textbookName?: string;
    /**
     * 교재비
     */
    textbookFee?: number;
    /**
     * 사전/연관 학습 설정 여부
     */
    isRelatedPrerequisiteCourseExisted: boolean;
    /**
     * 사전 학습
     */
    preRequisiteCourseIds?: Array<number>;
    /**
     * 연관 학습
     */
    relatedCourseIds?: Array<number>;
    /**
     * HMG 과정 데이터 표준 분류 > 대분류
     */
    hmgStandardMainCategory?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep4.hmgStandardMainCategory;
    /**
     * HMG 과정 데이터 표준 분류 > 중분류
     */
    hmgStandardSubCategory?: com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep4.hmgStandardSubCategory;
    /**
     * 1인당 교육비 사용
     */
    isUseTrainingCostPerPerson?: boolean;
    /**
     * 1인당 교육비(원)
     */
    trainingCostPerPerson?: number;
    /**
     * 고용보험 환급 사용
     */
    isUseEmploymentInsuranceRefund?: boolean;
    /**
     * 고용보험 환급비(원)
     */
    employmentInsuranceRefund?: number;
    /**
     * 오토에버 위탁 전용 설정 여부
     */
    isUseOutsourcing?: boolean;
    /**
     * 수강신청 단계에서 레벨테스트 수집 여부
     */
    isPreLevelTestRequired?: boolean;
    /**
     * 수강신청 단계에서 배송지 수집 여부
     */
    isBookDeliveryInfoRequired?: boolean;
    /**
     * 튜터id
     */
    tutorId?: number;
    /**
     * 튜터 이름
     */
    tutorName?: string;
    /**
     * 위탁 소유 회사 ID
     */
    outsourcingCompanyId?: number;
    /**
     * 위탁 소유 회사 이름
     */
    outsourcingCompanyName?: string;
};
export namespace com_ever_edu_lms_course_dto_req_CourseUpsertReqDto_WizardStep4 {
    /**
     * 과정 생성/수정 마법사 타입 (lms.course.WizardStep)
     */
    export enum wizardStep {
        STEP1 = 'STEP1',
        STEP2 = 'STEP2',
        STEP3 = 'STEP3',
        STEP4 = 'STEP4',
        STEP5 = 'STEP5',
        FULL_UPDATE = 'FULL_UPDATE',
    }
    /**
     * 기기 제한
     */
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
        TIME = 'TIME',
        COUNT_TIME = 'COUNT_TIME',
    }
    /**
     * (lms.course.InstructorAssignType)
     */
    export enum instructorAssignType {
        REGISTERED = 'REGISTERED',
        MANUAL = 'MANUAL',
    }
    /**
     * HMG 과정 데이터 표준 분류 > 대분류
     */
    export enum hmgStandardMainCategory {
        COMM_ON_BOARD = 'COMM_ON_BOARD',
        COMM_ROLE = 'COMM_ROLE',
        COMM_GLOBAL = 'COMM_GLOBAL',
        COMM_ETC = 'COMM_ETC',
        ROLE_LITERACY = 'ROLE_LITERACY',
        ROLE_BASE = 'ROLE_BASE',
        ROLE_ADVANCED = 'ROLE_ADVANCED',
        LEADER = 'LEADER',
    }
    /**
     * HMG 과정 데이터 표준 분류 > 중분류
     */
    export enum hmgStandardSubCategory {
        SOFTWARE = 'SOFTWARE',
        AI_DS = 'AI_DS',
        ELECTRIFICATION = 'ELECTRIFICATION',
        FUTURE_MOBILITY = 'FUTURE_MOBILITY',
        ENERGY = 'ENERGY',
        START_CITY = 'START_CITY',
        ETC = 'ETC',
    }
}

