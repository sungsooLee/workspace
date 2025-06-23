import { PaginationRequest } from './api';

export interface Course {
  courseId?: number;
  wizardStep?: wizardStep;
  channelId?: number;
  tenantIds?: Array<number>;
  primaryCategoryId?: number;
  categoryIds?: Array<number>;
  whiteListIds?: Array<number>;
  language?: string;
  courseName?: string;
  courseSummary?: string;
  courseContent?: string;
  trainingLevelType?: trainingLevelType;
  /**
   * (lms.course.LearningSpaceType)
   */
  learningSpaceType?: learningSpaceType;
  learningSpaceId?: number;
  learningSpaceName?: string;
  coordinatorId?: number;
  coordinatorName?: string;
  coordinatorTelNo?: string;
  coordinatorEmail?: string;
  operatorId?: number;
  operatorName?: string;
  operatorTelNo?: string;
  operatorEmail?: string;
  instructorId?: number;
  tutorId?: number;

  // 2
  isEnrollRequired?: boolean;
  approvalLineType?: approvalLineType;
  isMaxEnrollQuotaRestricted?: boolean;
  maxEnrollQuota?: number;
  waitListPickMethodType?: waitListPickMethodType;
  maxWaitlistQuota?: number;
  isDuplicateEnrollAllowed?: boolean;
  /**
   * 수강신청 단계에서 배송지 수집 여부
   */
  isBookDeliveryInfoRequired?: boolean;
  /**
   * 수강신청 단계에서 레벨테스트 수집 여부
   */
  isPreLevelTestRequired?: boolean;

  // 3
  primaryCurriculumId?: number;
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
  courseType?: courseType;
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

/**
 * 과정유형
 */
export enum courseType {
  ELEARNING1 = 'ELEARNING1',
  ELEARNING2 = 'ELEARNING2',
  CLASS = 'CLASS',
  LIVE = 'LIVE',
  EXAM = 'EXAM',
  SURVEY = 'SURVEY',
}
