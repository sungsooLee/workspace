/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { com_ever_edu_external_blackandwhite_dto_res_WhiteGroupResDto } from './com_ever_edu_external_blackandwhite_dto_res_WhiteGroupResDto';
import type { com_ever_edu_external_tenant_dto_res_TenantResDto } from './com_ever_edu_external_tenant_dto_res_TenantResDto';
import type { com_ever_edu_lms_category_dto_res_CourseCategoryFlatDto } from './com_ever_edu_lms_category_dto_res_CourseCategoryFlatDto';
import type { com_ever_edu_lms_course_dto_res_CourseAdminResDto$SimpleCourseDto } from './com_ever_edu_lms_course_dto_res_CourseAdminResDto$SimpleCourseDto';
import type { com_ever_edu_lms_course_dto_TenantCustomDto } from './com_ever_edu_lms_course_dto_TenantCustomDto';
import type { com_ever_edu_lms_tag_dto_res_TagResDto } from './com_ever_edu_lms_tag_dto_res_TagResDto';
export type com_ever_edu_lms_course_dto_res_CourseAdminResDto = {
    wizardStep?: com_ever_edu_lms_course_dto_res_CourseAdminResDto.wizardStep;
    courseId?: number;
    isBookmarks?: boolean;
    tenantId?: number;
    courseType?: com_ever_edu_lms_course_dto_res_CourseAdminResDto.courseType;
    channelUuid?: string;
    tenantList?: Array<com_ever_edu_external_tenant_dto_res_TenantResDto>;
    /**
     * 대표카테고리 ID
     */
    primaryCategoryId?: number;
    /**
     * 카테고리 목록
     */
    categories?: Array<com_ever_edu_lms_category_dto_res_CourseCategoryFlatDto>;
    targetList?: Array<com_ever_edu_external_blackandwhite_dto_res_WhiteGroupResDto>;
    language?: string;
    courseName?: string;
    courseSummary?: string;
    courseContent?: string;
    trainingLevelType?: com_ever_edu_lms_course_dto_res_CourseAdminResDto.trainingLevelType;
    learningSpaceType?: com_ever_edu_lms_course_dto_res_CourseAdminResDto.learningSpaceType;
    learningSpaceId?: number;
    learningSpaceName?: string;
    learningSpaceNameKeyIn?: string;
    coordinatorUuid?: string;
    /**
     * 담당자 이름
     */
    coordinatorName?: string;
    /**
     * 담당자 부서명
     */
    coordinatorDeptName?: string;
    coordinatorTelNo?: string;
    /**
     * 담당자 이메일
     */
    coordinatorEmail?: string;
    operatorUuid?: string;
    /**
     * 운영자 이름
     */
    operatorName?: string;
    /**
     * 운영자 부서이름
     */
    operatorDeptName?: string;
    operatorTelNo?: string;
    /**
     * 운영자 이메일
     */
    operatorEmail?: string;
    /**
     * 수강신청 설정 여부
     */
    isEnrollRequired?: boolean;
    /**
     * 수강신청 결재 라인 (pms.course.ApprovalLineType)
     */
    approvalLineType?: com_ever_edu_lms_course_dto_res_CourseAdminResDto.approvalLineType;
    /**
     * 수강 신청 정원 제한 여부
     */
    isMaxEnrollQuotaRestricted?: boolean;
    /**
     * 수강 신청 정원
     */
    maxEnrollQuota?: number;
    /**
     * 수강 신청 대기 (lms.course.WaitListPickMethodType)
     */
    waitListPickMethodType?: com_ever_edu_lms_course_dto_res_CourseAdminResDto.waitListPickMethodType;
    /**
     * 최대 대기 인원
     */
    maxWaitlistQuota?: number;
    /**
     * 차수 중복수강
     */
    isDuplicateEnrollAllowed?: boolean;
    /**
     * 대표 커리큘럼id
     */
    primaryCurriculumId?: number;
    /**
     * 학습 환경 설정 여부
     */
    isLearnEnvEnabled?: boolean;
    /**
     * 기기 제한
     */
    deviceRestrictType?: com_ever_edu_lms_course_dto_res_CourseAdminResDto.deviceRestrictType;
    /**
     * 네트워크 제한(사내망 제어 여부)
     */
    isIntranetRestricted?: boolean;
    /**
     * (lms.course.LearningRestrictTimeType)
     */
    learningRestrictTimeType?: com_ever_edu_lms_course_dto_res_CourseAdminResDto.learningRestrictTimeType;
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
    isLearnControlEnabled?: boolean;
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
    maxPlayBackRate?: com_ever_edu_lms_course_dto_res_CourseAdminResDto.maxPlayBackRate;
    /**
     * 이수기준 설정 여부
     */
    isUsePassOption?: boolean;
    /**
     * (lms.course.PassMethodType)
     */
    passMethodType?: com_ever_edu_lms_course_dto_res_CourseAdminResDto.passMethodType;
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
    recognizedStudyMinType?: com_ever_edu_lms_course_dto_res_CourseAdminResDto.recognizedStudyMinType;
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
    isCommunicationToolEnabled?: boolean;
    /**
     * 커뮤니티 사용 설정 내용
     */
    communityList?: Array<'QNA' | 'FAQ' | 'BOARD' | 'MARTIAL'>;
    /**
     * 과정 공유 여부
     */
    isSharingAllowed?: boolean;
    /**
     * 공지사항
     */
    isNoticeEnabled?: boolean;
    /**
     * 학습창댓글
     */
    isReplyEnabled?: boolean;
    /**
     * 강사 설정 여부
     */
    isInstructorAssigned?: boolean;
    /**
     * (lms.course.InstructorAssignType)
     */
    instructorAssignType?: com_ever_edu_lms_course_dto_res_CourseAdminResDto.instructorAssignType;
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
    isTextbookProvided?: boolean;
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
    isRelatedPrerequisiteCourseExisted?: boolean;
    preRequisiteCourseList?: Array<com_ever_edu_lms_course_dto_res_CourseAdminResDto$SimpleCourseDto>;
    relatedCourseList?: Array<com_ever_edu_lms_course_dto_res_CourseAdminResDto$SimpleCourseDto>;
    /**
     * HMG 과정 데이터 표준 분류 > 대분류
     */
    hmgStandardMainCategory?: com_ever_edu_lms_course_dto_res_CourseAdminResDto.hmgStandardMainCategory;
    /**
     * HMG 과정 데이터 표준 분류 > 중분류
     */
    hmgStandardSubCategory?: com_ever_edu_lms_course_dto_res_CourseAdminResDto.hmgStandardSubCategory;
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
    isCarTenantCustomOption?: boolean;
    /**
     * 로템 테넌트 전용 항목 설정 여부
     */
    isRotemTenantCustomOption?: boolean;
    /**
     * 위탁 테넌트 전용 항목 설정 여부
     */
    isOutsourcingTenantCustomOption?: boolean;
    /**
     * 위아 테넌트 전용 항목 설정 여부
     */
    isWiaTenantCustomOption?: boolean;
    /**
     * 오토에버 위탁 전용 설정 여부
     */
    isAutoeverTenantCustomOption?: boolean;
    /**
     * 테넌트 전용 설정 내용
     */
    tenantCustoms?: Array<com_ever_edu_lms_course_dto_TenantCustomDto>;
    /**
     * 사용 여부
     */
    isUsed?: boolean;
    /**
     * 과정 노출 시작일
     */
    courseValidityStartDateTime?: string;
    /**
     * 과정 노출 종료일
     */
    courseValidityEndDateTime?: string;
    /**
     * 썸네일 이미지 Group UUID
     */
    thumbnailFileGroupUuid?: string;
    /**
     * 대표 썸네일 이미지 UUID
     */
    primaryThumbnailFileUuid?: string;
    /**
     * 태그 이름 목록
     */
    tagNames?: Array<com_ever_edu_lms_tag_dto_res_TagResDto>;
};
export namespace com_ever_edu_lms_course_dto_res_CourseAdminResDto {
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
    export enum learningSpaceType {
        LEARNING_WAY = 'LEARNING_WAY',
        REGISTERED = 'REGISTERED',
        MANUAL = 'MANUAL',
    }
    /**
     * 수강신청 결재 라인 (pms.course.ApprovalLineType)
     */
    export enum approvalLineType {
        NONE = 'NONE',
        LEADER = 'LEADER',
        OPERATOR = 'OPERATOR',
        LEADER_OPERATOR = 'LEADER_OPERATOR',
        DEPEND_COMPANY = 'DEPEND_COMPANY',
    }
    /**
     * 수강 신청 대기 (lms.course.WaitListPickMethodType)
     */
    export enum waitListPickMethodType {
        NONE = 'NONE',
        AUTO = 'AUTO',
        MANUAL = 'MANUAL',
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

