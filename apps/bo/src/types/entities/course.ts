export interface Course {
  /** 과정 ID */
  courseId: number;

  /** 사용 여부 */
  isUsed?: boolean;

  /** 공개 여부 */
  isPublished?: boolean;

  /** 과정 생성/수정 마법사 타입 */
  wizardStep?: string; // com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.wizardStep;

  courseType?: string; // com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.courseType;

  courseSubType?: string; // com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.courseSubType;

  language?: string;

  channelId?: number;

  /** 과정명 */
  courseName?: string;

  /** 과정요약 */
  courseSummary?: string;

  /** 교육목표 */
  courseGoal?: string;

  /** 과정내용 */
  courseContent?: string;

  /** 학습대상 */
  trainingTarget?: string;

  /** 난이도 */
  trainingLevelType?: string; // com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.trainingLevelType;

  tenantIds?: Array<number>;

  primaryCategoryId?: number;

  categories?: Array<any>; // Array<com_ever_edu_lms_category_dto_res_CourseCategoryFlatDto>;

  /** 화이트 그룹리스트 전체(FALSE), 선택(TRUE) */
  isWhiteList?: boolean;

  /** 화이트 그룹리스트 */
  whiteList?: Array<any>; // Array<com_ever_edu_lms_blackwhite_dto_req_BlackAndWhiteCombinerReqDto>;

  /** 담당자 ID */
  coordinatorId?: number;

  /** 담당자 이름 */
  coordinatorName?: string;

  /** 담당자 연락처 */
  coordinatorTelNo?: string;

  /** 운영자 ID */
  operatorId?: number;

  /** 운영자 이름 */
  operatorName?: string;

  /** 운영자 연락처 */
  operatorTelNo?: string;

  hasConfigEnroll?: boolean;

  /** 수강신청 사용 여부 */
  isEnrollRequired?: boolean;

  /** 수강신청 결재 라인 */
  approvalLineType?: string; // com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.approvalLineType;

  /** 수강신청 정원 제한 여부 */
  isMaxEnrollQuotaRestricted?: boolean;

  /** 수강신청 정원 */
  maxEnrollQuota?: number;

  /** 수강 신청 대기 기능 사용 여부 */
  isWaitListFuncActivated?: boolean;

  /** 수강 신청 대기 인원 배정 타입 */
  waitListAssignType?: string; // com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.waitListAssignType;

  /** 수강 신청 대기자 입과 방식 */
  waitListEnrollMethodType?: string; // com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.waitListEnrollMethodType;

  /** 최대 대기 인원 */
  maxWaitlistQuota?: number;

  /** 수강신청 취소기간 설정 있음 없음 */
  isEnrollCancelDeadLineActivated?: boolean;

  /** 수강신청 취소기간 설정 값(시작 n일 전까지) */
  enrollCancelDeadLineDays?: number;

  /** 중복 수강신청 제한 여부 */
  isDuplicateEnrollAllowed?: boolean;

  /** 학습 기간 중복 예외 허용 여부 */
  isScheduleConflictAllowed?: boolean;

  /** 배송지 수집 단위 */
  bookDeliveryInfoScopeType?: string; // com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.bookDeliveryInfoScopeType;

  /** 레벨테스트 수행 단위 */
  langLevelTestScopeType?: string; // com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.langLevelTestScopeType;

  /** 키트id, 커리큘럼id (대표, 개정 버전이 있음으로) */
  primaryKitId?: number;

  hasConfigLearnControl?: boolean;

  /** 제한 기기 */
  deviceRestrictType?: string; // com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.deviceRestrictType;

  /** 학습 제한 시간(근무시간 내/외 */
  learningRestrictTimeType?: string; // com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.learningRestrictTimeType;

  /** 1일 진도 제한 */
  isDailyLearningProgressRestricted?: boolean;

  /** 1일 진도 제한(%) */
  maxDailyLearningProgress?: number;

  /** 진도 초기화 여부 */
  isProgressResetEnabled?: boolean;

  /** 커리큘럼 순차 학습 적용 여부 */
  isSequentialLearningRequired?: boolean;

  /** 플레이어 탐색바 제한 여부 */
  isPlayerControlRestricted?: boolean;

  /** 플레이어 최대 배속 */
  maxPlayBackRate?: string; // com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.maxPlayBackRate;

  /** 복습 제한 여부 */
  isReviewRestricted?: boolean;

  /** 복습 가능 기간 */
  maxReviewPeriod?: number;

  /** 캡처 방지 여부 */
  isCaptureBlockEnabled?: boolean;

  /** 사내망 제어 여부 */
  isIntranetRestricted?: boolean;

  /** 보안 서약 여부 */
  isSecurityAgreementEnable?: boolean;

  /** 학습 공간(교육 장소) */
  learningSpaceType?: string; // com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.learningSpaceType;

  /** 사전 학습 */
  preRequisiteCourse?: Array<any>; // Array<com_ever_edu_lms_course_dto_res_CourseResDto$SimpleCourseDto>;

  /** 연관 학습 */
  relatedCourse?: Array<any>; // Array<com_ever_edu_lms_course_dto_res_CourseResDto$SimpleCourseDto>;

  /** 댓글 등록 가능 여부 */
  isCommentEnabled?: boolean;

  /** 과정 공유 가능 여부 */
  isSharingAllowed?: boolean;

  /** 이수 처리 방식 (자동/수동) */
  passMethodType?: string; // com_ever_edu_lms_course_dto_res_CourseResDto$CourseOnAdmin.passMethodType;

  /** 이수 기준 (진도/출석) */
  progressMinPassScore?: number;

  /** 이수 기준 (시험) */
  examMinPassScore?: number;

  /** 이수 기준 (과제) */
  asgmtMinPassScore?: number;

  /** 이수 기준 (총점) */
  totalMinPassScore?: number;

  /** 반영 비율 (진도/출석) */
  progressWeights?: number;

  /** 반영 비율 (시험) */
  examWeights?: number;

  /** 반영 비율 (과제) */
  asgmtWeights?: number;

  /** 인정학습시간(분) */
  recognizedStudyMinutes?: number;

  /** 수료증 제공 여부 */
  isRecognizedStudyPoint?: boolean;

  /** 인정학습점수(학습포인트) */
  recognizedStudyPoint?: number;

  /** 수료증 제공 여부 */
  isCertificateProvided?: boolean;

  /** 교재 제공 여부 */
  isTextbookProvided?: boolean;

  /** 교재명 */
  textbookName?: string;

  /** 교재비 */
  textbookFee?: number;

  /** 콘텐츠비 */
  contentFee?: number;

  /** 교재매입액 */
  textbookPurchaseCost?: number;

  /** 교재매입배분율 */
  textbookPurchaseAllocationRate?: number;

  /** 콘텐츠매입액 */
  contentPurchaseCost?: number;

  /** 콘텐츠매입배분율 */
  contentPurchaseAllocationRatio?: number;

  /** 썸네일 이미지 id? 주소로 대체해야하나 결정 필요 */
  thumbnailGroupId?: number;

  /** 썸네일 이미지 id? 주소로 대체해야하나 결정 필요 */
  primaryThumbnailId?: number;

  tagNames?: Array<any>; // Array<com_ever_edu_lms_course_dto_res_CourseResDto$TagNameWrapper>;

  /** 과정 유효 시작일 */
  courseValidityStartDate?: string;

  /** 과정 유효 종료일 */
  courseValidityEndDate?: string;
}

export interface CourseResponse {
  courseId: number;
  courseTsid: string;
  channelId: number;
  channelName: string;
  courseType: string;
  courseName: string;
  trainingGoals: string;
  expectedOutcomes: string;
  courseContent: string;
  coordinatorId: number;
  coordinatorName: string;
  openingYear: number;
  isApproved: boolean;
  isUsed: boolean;
  isPublished: boolean;
  isDeleted: boolean;
  companyId: number;
  approvalRouteId: number;
  trainingPlatformType: string;
  isEnrollNeeded: boolean;
  categories: {
    id: number;
    parentId: number;
    name: string;
    sortSeq: number;
    categoryType: string;
  }[];
}

export interface CourseQueryParams {
  /**
   * 테넌트
   */
  tenantId?: string;
}

// -------------------------------------------
// 참고용 enum
// -------------------------------------------

// export enum wizardStep {
//   STEP1 = 'STEP1',
//   STEP2 = 'STEP2',
//   STEP3 = 'STEP3',
//   STEP4 = 'STEP4',
//   STEP5 = 'STEP5',
//   FULL_UPDATE = 'FULL_UPDATE',
// }
// export enum courseType {
//   ELEARNING = 'ELEARNING',
//   CLASS = 'CLASS',
//   LIVE = 'LIVE',
//   EXAM = 'EXAM',
//   SURVEY = 'SURVEY',
//   PACKAGE = 'PACKAGE',
// }
// export enum courseSubType {
//   SANGSI_LEARN = 'SANGSI_LEARN',
//   NORMAL = 'NORMAL',
//   SANGSI_ENROLL = 'SANGSI_ENROLL',
//   FACE_TO_FACE = 'FACE_TO_FACE',
//   NONE_FACE_TO_FACE = 'NONE_FACE_TO_FACE',
//   HYBRID = 'HYBRID',
//   LIVE = 'LIVE',
//   EXAM = 'EXAM',
//   SURVEY = 'SURVEY',
// }
// export enum trainingLevelType {
//   NONE = 'NONE',
//   BEGINNER = 'BEGINNER',
//   BASIC = 'BASIC',
//   INTERMEDIATE = 'INTERMEDIATE',
//   ADVANCED = 'ADVANCED',
//   EXPERT = 'EXPERT',
// }
// export enum approvalLineType {
//   NONE = 'NONE',
//   LEADER = 'LEADER',
//   OPERATOR = 'OPERATOR',
//   LEADER_OPERATOR = 'LEADER_OPERATOR',
//   DEPEND_COMPANY = 'DEPEND_COMPANY',
// }
// export enum waitListAssignType {
//   PERCENTAGE = 'PERCENTAGE',
//   FIXED_COUNT = 'FIXED_COUNT',
// }
// export enum waitListEnrollMethodType {
//   ADMIN_PUSH = 'ADMIN_PUSH',
//   MAIL_SEND = 'MAIL_SEND',
// }
// /**
//  * 수강신청 단계에서 배송지 수집을 과정마다할 지 차수마다 할 지
//  */
// export enum bookDeliveryInfoScopeType {
//   NONE = 'NONE',
//   PER_COURSE = 'PER_COURSE',
//   PER_SEQ = 'PER_SEQ',
// }
// /**
//  * 수강신청 단계에서 레벨테스트를 과정마다할 지 차수마다 할 지
//  */
// export enum langLevelTestScopeType {
//   NONE = 'NONE',
//   PER_COURSE = 'PER_COURSE',
//   PER_SEQ = 'PER_SEQ',
// }
// export enum deviceRestrictType {
//   NONE = 'NONE',
//   PC = 'PC',
//   MOBILE = 'MOBILE',
// }
// export enum learningRestrictTimeType {
//   NONE = 'NONE',
//   WORK_HOURS = 'WORK_HOURS',
//   OFF_HOURS = 'OFF_HOURS',
// }
// export enum maxPlayBackRate {
//   X1_25 = 'X1_25',
//   X1_5 = 'X1_5',
//   X1_75 = 'X1_75',
//   X2 = 'X2',
// }
// export enum learningSpaceType {
//   EXTERNAL_SITE = 'EXTERNAL_SITE',
//   LEARNING_WAY = 'LEARNING_WAY',
//   FACE_TO_FACE = 'FACE_TO_FACE',
//   NONE_FACE_TO_FACE = 'NONE_FACE_TO_FACE',
// }
// export enum passMethodType {
//   AUTO = 'AUTO',
//   MANUAL = 'MANUAL',
// }
