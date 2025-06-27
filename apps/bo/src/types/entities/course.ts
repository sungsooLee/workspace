import { PaginationRequest } from './api';

/**
 * 과정 정보 (목록 조회)
 */
export interface CourseListItem {
  /**
   * 과정 uuid
   */
  courseUuid: string;
  /**
   * 완료된 마법사 단계
   */
  completedWizardStep: 'STEP1' | 'STEP2' | 'STEP3' | 'STEP4' | 'STEP5' | 'FULL_UPDATE';
  /**
   * 테넌트 이름
   */
  tenantName: string;
  /**
   * 채널 이름
   */
  channelName: string;
  /**
   * 과정 아이디
   */
  courseId: number;
  /**
   * 개설 연도
   */
  openingYear: number;
  /**
   * 과정 유형
   */
  courseType: string;
  /**
   * 북마크 여부
   */
  isBookmarks: boolean;
  /**
   * 과정 이름
   */
  courseName: string;
  /**
   * 사용 여부
   */
  isUsed: boolean;
  /**
   * 차수
   */
  sequenceCount: number;
  /**
   * 조회수
   */
  viewCount: number;
  /**
   * 좋아요 수
   */
  likesCount: number;
  /**
   * 공유 수
   */
  shareCount: number;
  /**
   * 리뷰 수
   */
  reviewCount: number;
  /**
   * 수강생 수
   */
  studentCount: number;
  /**
   * 담당자 이름
   */
  coordinatorName: string;
  /**
   * 운영자 이름
   */
  operatorName: string;
}

export interface CoursesQueryParams extends PaginationRequest {
  /**
   * 채널id
   */
  channelId: number;
  /**
   * 테넌트id
   */
  tenantId: number;
  /**
   * 개설 연도
   */
  openYear?: number;
  /**
   * 과정유형
   */
  courseType?: string;
  /**
   * 사용여부
   */
  isUsed?: boolean;
  /**
   * 담당자/운영자
   */
  adminName?: string;
  /**
   * 과정코드
   */
  courseId?: number;
  /**
   * 과정명
   */
  courseName?: string;
}

/**
 * 과정 정보
 */
export interface Course {
  // 과정 아이디
  courseId?: number;

  // STEP1
  /**
   * 과정 생성/수정 마법사 타입 (lms.course.WizardStep)
   */
  wizardStep?: 'STEP1' | 'STEP2' | 'STEP3' | 'STEP4' | 'STEP5' | 'FULL_UPDATE';
  /**
   * 채널 uuid
   */
  channelUuid?: string;
  /**
   * 테넌트 ID 배열
   */
  tenantIds?: Array<number>;
  /**
   * 대표 카테고리 id
   */
  primaryCategoryId?: number;
  /**
   * 카테고리 ID 배열
   */
  categoryIds?: Array<number>;
  /**
   * 학습대상-유저그룹(화이트 그룹리스트)
   */
  whiteListIds?: Array<number>;
  /**
   * 언어 설정
   */
  language?: string;
  /**
   * 과정명
   */
  courseName?: string;
  /**
   * 과정요약
   */
  courseSummary?: string;
  /**
   * 과정내용
   */
  courseContent?: string;
  /**
   * 난이도 (lms.course.TrainingLevelType)
   */
  trainingLevelType?: string;
  /**
   * (lms.course.LearningSpaceType)
   */
  learningSpaceType?: string;
  /**
   * 교육 장소 ID
   */
  learningSpaceId?: number;
  /**
   * 교육 장소 직접입력
   */
  learningSpaceName?: string;
  /**
   * 담당자 ID
   */
  coordinatorId?: number;
  /**
   * 담당자 이름
   */
  coordinatorName?: string;
  /**
   * 부서이름
   */
  coordinatorDeptName?: string;
  /**
   * 담당자 연락처 국가코드
   */
  coordinatorTelCountryCode?: string;
  /**
   * 담당자 연락처
   */
  coordinatorTelNo?: string;
  /**
   * 담당자 이메일
   */
  coordinatorEmail?: string;
  /**
   * 운영자 ID
   */
  operatorId?: number;
  /**
   * 운영자 이름
   */
  operatorName?: string;
  /**
   * 운영자 부서이름
   */
  operatorDeptName?: string;
  /**
   * 운영자 연락처 국가코드
   */
  operatorTelCountryCode?: string;
  /**
   * 운영자 연락처
   */
  operatorTelNo?: string;
  /**
   * 운영자 이메일
   */
  operatorEmail?: string;
  /**
   * 강사ID
   */
  instructorId?: number;
  /**
   * 위탁 소유 회사 ID
   */
  outsourcingCompanyId?: number;
  /**
   * 위탁 소유 회사 이름
   */
  outsourcingCompanyName?: string;

  // STEP2
  /**
   * 수강신청 설정 여부
   */
  isEnrollRequired?: boolean;
  /**
   * 수강신청 결재 라인 (pms.course.ApprovalLineType)
   */
  approvalLineType?: string;
  /**
   * 수강 신청 정원 제한 여부
   */
  isMaxEnrollQuotaRestricted?: boolean;
  /**
   * 수강 신청 정원
   */
  maxEnrollQuota?: number;
  /**
   * 수강 신청 대기자 선정 방식 (lms.course.WaitListPickMethodType)
   */
  waitListPickMethodType?: string;
  /**
   * 최대 대기 인원
   */
  maxWaitlistQuota?: number;
  /**
   * 중복 수강신청 제한 여부
   */
  isDuplicateEnrollAllowed?: boolean;

  // STEP3
  /**
   * 대표 커리큘럼id
   */
  primaryCurriculumId?: number;

  // STEP4
  /**
   * 학습 환경 설정 여부
   */
  isLearnEnvEnabled?: boolean;
  /**
   * 기기 제한
   */
  deviceRestrictType?: string;
  /**
   * 네트워크 제한(사내망 제어 여부)
   */
  isIntranetRestricted?: boolean;
  /**
   * (lms.course.LearningRestrictTimeType)
   */
  learningRestrictTimeType?: string;
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
  maxPlayBackRate?: string;
  /**
   * 이수기준 설정 여부
   */
  isUsePassOption?: boolean;
  /**
   * (lms.course.PassMethodType)
   */
  passMethodType?: string;
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
  recognizedStudyMinType?: string;
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
   * 공지사항 기능 사용 여부
   */
  isNoticeEnabled?: boolean;
  /**
   * Q&A 기능 사용 여부
   */
  isQnaBoardEnabled?: boolean;
  /**
   * 자료실 기능 사용 여부
   */
  isMartialBoardEnabled?: boolean;
  /**
   * 커뮤니티 기능 사용 여부
   */
  isCommunityEnabled?: boolean;
  /**
   * 과정을 학습자가 공유할 수 있는지?
   */
  isSharingAllowed?: boolean;
  /**
   * 강사 설정 여부
   */
  isInstructorAssigned?: boolean;
  /**
   * (lms.course.InstructorAssignType)
   */
  instructorAssignType?: string;
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
  hmgStandardMainCategory?: string;
  /**
   * HMG 과정 데이터 표준 분류 > 중분류
   */
  hmgStandardSubCategory?: string;
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
}

/**
 * 과정 항목 설정 정보 조회 파라미터
 */
export interface CourseConfigQueryParams {
  /**
   * 채널id
   */
  channelId: number;
  /**
   * 과정id
   */
  courseId: string;
}

/**
 * 과정 항목 설정 정보 응답
 */
export interface CourseConfig {
  /**
   * 수강신청 설정
   */
  enrollOption: string;
  /**
   * 학습 환경 설정
   */
  learningEnvOption: string;
  /**
   * 학습 제어 설정
   */
  learningControlOption: string;
  /**
   * 이수기준 설정
   */
  passOption: string;
  /**
   * 커뮤니티 설정
   */
  communicationOption: string;
  /**
   * 강사 설정
   */
  instructorOption: string;
  /**
   * 교재 설정
   */
  textBookOption: string;
  /**
   * 사전/연관학습 설정
   */
  relatedCourseOption: string;
  /**
   * 행정항목 설정
   */
  adminDataOption: string;
  /**
   * 사용가능 컨텐츠 설정
   */
  allowedContentTypes: string[];
  /**
   * 파일 저장소 유형
   */
  fileStorageType: string;
}
