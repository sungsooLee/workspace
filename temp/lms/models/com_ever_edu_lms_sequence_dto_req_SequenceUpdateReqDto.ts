/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_external_blackandwhite_dto_req_WhiteGroupReqDto } from './com_ever_edu_external_blackandwhite_dto_req_WhiteGroupReqDto';
import type { com_ever_edu_lms_course_dto_TenantCustomDto } from './com_ever_edu_lms_course_dto_TenantCustomDto';
export type com_ever_edu_lms_sequence_dto_req_SequenceUpdateReqDto = {
    /**
     * 테넌트 목록
     */
    tenantIds: Array<number>;
    /**
     * 학습대상(유저그룹)
     */
    targetList?: Array<com_ever_edu_external_blackandwhite_dto_req_WhiteGroupReqDto>;
    /**
     * 차수명
     */
    courseSequenceName: string;
    /**
     * 사용여부
     */
    isUsed: boolean;
    /**
     * 수강신청 시작일시
     */
    enrollStartDateTime: string;
    /**
     * 수강신청 종료일시
     */
    enrollEndDateTime: string;
    /**
     * 수강 취소 사용여부
     */
    isEnrollCancelDeadLineActivated: boolean;
    /**
     * 수강취소가능시작일시
     */
    enrollCancelStartDateTime?: string;
    /**
     * 수강취소가능종료일시
     */
    enrollCancelEndDateTime?: string;
    /**
     * 학습기간 지정 유형
     */
    learningStartType: com_ever_edu_lms_sequence_dto_req_SequenceUpdateReqDto.learningStartType;
    /**
     * 교육시작 N일(신청완료 후 N일 후 교육시작)
     */
    learningStartDays?: number;
    /**
     * 학습시작일시
     */
    learningStartDateTime?: string;
    /**
     * 학습종료일시
     */
    learningEndDateTime?: string;
    learningSpaceType?: com_ever_edu_lms_sequence_dto_req_SequenceUpdateReqDto.learningSpaceType;
    /**
     * 교육 장소 ID
     */
    learningSpaceId?: number;
    /**
     * 교육 장소(선택입력)
     */
    learningSpaceName?: string;
    /**
     * 교육 장소 직접입력
     */
    learningSpaceNameKeyIn?: string;
    /**
     * 수강신청 결재라인
     */
    approvalLineType: com_ever_edu_lms_sequence_dto_req_SequenceUpdateReqDto.approvalLineType;
    /**
     * 수강신청 정원 제한 여부
     */
    isMaxEnrollQuotaRestricted: boolean;
    /**
     * 수강신청 정원
     */
    maxEnrollQuota?: number;
    /**
     * 수강 신청 대기 모드
     */
    waitListPickMethodType: com_ever_edu_lms_sequence_dto_req_SequenceUpdateReqDto.waitListPickMethodType;
    /**
     * 최대 대기 인원
     */
    maxWaitlistQuota?: number;
    /**
     * 강사 설정 여부
     */
    isInstructorAssigned: boolean;
    /**
     * (lms.course.InstructorAssignType)
     */
    instructorAssignType?: com_ever_edu_lms_sequence_dto_req_SequenceUpdateReqDto.instructorAssignType;
    /**
     * 강사ID
     */
    instructorId?: number;
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
    coordinatorUuid: string;
    operatorUuid: string;
    /**
     * 이수기준 설정 여부
     */
    isUsePassOption: boolean;
    /**
     * (lms.course.PassMethodType)
     */
    passMethodType?: com_ever_edu_lms_sequence_dto_req_SequenceUpdateReqDto.passMethodType;
    /**
     * 수료증 제공 여부
     */
    isCertificateProvided?: boolean;
    /**
     * 항목별 이수 기준 (진도)
     */
    progressMinPassScore?: number;
    /**
     * 항목별 이수 기준 (출석)
     */
    attendanceMinPassScore?: number;
    /**
     * 항목별 이수 기준 (평가)
     */
    examMinPassScore?: number;
    /**
     * 항목별 이수 기준 (과제)
     */
    asgmtMinPassScore?: number;
    /**
     * 항목별 이수 기준 (총점)
     */
    totalMinPassScore?: number;
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
    recognizedStudyMinType?: com_ever_edu_lms_sequence_dto_req_SequenceUpdateReqDto.recognizedStudyMinType;
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
     * 학습 환경 설정 여부
     */
    isLearnEnvEnabled: boolean;
    /**
     * 기기 제한
     */
    deviceRestrictType?: com_ever_edu_lms_sequence_dto_req_SequenceUpdateReqDto.deviceRestrictType;
    /**
     * 네트워크 제한(사내망 제어 여부)
     */
    isIntranetRestricted?: boolean;
    /**
     * (lms.course.LearningRestrictTimeType)
     */
    learningRestrictTimeType?: com_ever_edu_lms_sequence_dto_req_SequenceUpdateReqDto.learningRestrictTimeType;
    /**
     * 복습 제한 여부
     */
    isReviewRestricted?: boolean;
    /**
     * 복습 가능 기간(개월)
     */
    maxReviewPeriodMonths?: number;
    /**
     * 캡처 방지 여부
     */
    isCaptureBlockEnabled?: boolean;
    /**
     * 보안 서약 여부
     */
    isSecurityAgreementEnable?: boolean;
    /**
     * 학습 제어 설정 여부
     */
    isLearnControlEnabled: boolean;
    /**
     * 1일 진도 제한
     */
    isDailyLearningProgressRestricted?: boolean;
    /**
     * 1일 진도 제한(%)
     */
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
     * 동영상 탐색바 제한 여부
     */
    isPlayerControlRestricted?: boolean;
    /**
     * (cms.video.PlayBackRate)
     */
    maxPlayBackRate?: com_ever_edu_lms_sequence_dto_req_SequenceUpdateReqDto.maxPlayBackRate;
    /**
     * HMG 과정 데이터 표준 분류 > 대분류
     */
    hmgStandardMainCategory?: com_ever_edu_lms_sequence_dto_req_SequenceUpdateReqDto.hmgStandardMainCategory;
    /**
     * HMG 과정 데이터 표준 분류 > 중분류
     */
    hmgStandardSubCategory?: com_ever_edu_lms_sequence_dto_req_SequenceUpdateReqDto.hmgStandardSubCategory;
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
     * 숙박 여부
     */
    isStayed?: boolean;
    /**
     * 완성차 테넌트 전용 항목 설정 여부
     */
    isCarTenantCustomOption: boolean;
    /**
     * 로템 테넌트 전용 항목 설정 여부
     */
    isRotemTenantCustomOption: boolean;
    /**
     * 위탁 테넌트 전용 항목 설정 여부
     */
    isOutsourcingTenantCustomOption: boolean;
    /**
     * 위아 테넌트 전용 항목 설정 여부
     */
    isWiaTenantCustomOption: boolean;
    /**
     * 오토에버 위탁 전용 설정 여부
     */
    isAutoeverTenantCustomOption: boolean;
    /**
     * 테넌트 전용 설정 내용
     */
    tenantCustoms?: Array<com_ever_edu_lms_course_dto_TenantCustomDto>;
    /**
     * 커리큘럼 ID
     */
    curriculumId: number;
};
export namespace com_ever_edu_lms_sequence_dto_req_SequenceUpdateReqDto {
    /**
     * 학습기간 지정 유형
     */
    export enum learningStartType {
        FIXED_DATE = 'FIXED_DATE',
        DAYS_AFTER_ENROLL = 'DAYS_AFTER_ENROLL',
    }
    export enum learningSpaceType {
        LEARNING_WAY = 'LEARNING_WAY',
        REGISTERED = 'REGISTERED',
        MANUAL = 'MANUAL',
    }
    /**
     * 수강신청 결재라인
     */
    export enum approvalLineType {
        NONE = 'NONE',
        LEADER = 'LEADER',
        OPERATOR = 'OPERATOR',
        LEADER_OPERATOR = 'LEADER_OPERATOR',
        DEPEND_COMPANY = 'DEPEND_COMPANY',
    }
    /**
     * 수강 신청 대기 모드
     */
    export enum waitListPickMethodType {
        NONE = 'NONE',
        AUTO = 'AUTO',
        MANUAL = 'MANUAL',
    }
    /**
     * (lms.course.InstructorAssignType)
     */
    export enum instructorAssignType {
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
    /**
     * (lms.course.RecognizedStudyMinType)
     */
    export enum recognizedStudyMinType {
        TIME = 'TIME',
        COUNT_TIME = 'COUNT_TIME',
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
        X1 = 'X1',
        X1_25 = 'X1_25',
        X1_5 = 'X1_5',
        X1_75 = 'X1_75',
        X2 = 'X2',
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

