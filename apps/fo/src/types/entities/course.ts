
// 과정 이수 처리 방식
export enum PassMethodType {
  AUTO = 'AUTO',
  MANUAL = 'MANUAL',
}
// 과정 난이도
export enum TrainingLevelType {
  NONE = 'NONE',
  BEGINNER = 'BEGINNER',
  BASIC = 'BASIC',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
}
export const TrainingLevelTypeLabel: Record<TrainingLevelType, string> = {
  [TrainingLevelType.NONE]: '없음',
  [TrainingLevelType.BEGINNER]: '초급',
  [TrainingLevelType.BASIC]: '기초',
  [TrainingLevelType.INTERMEDIATE]: '중급',
  [TrainingLevelType.ADVANCED]: '고급',
  [TrainingLevelType.EXPERT]: '전문가',
};
// 과정 타입
export enum CourseType {
  ELEARNING1 = 'ELEARNING1',
  ELEARNING2 = 'ELEARNING2',
  CLASS = 'CLASS',
  LIVE = 'LIVE',
  EXAM = 'EXAM',
  SURVEY = 'SURVEY',
}
export const CourseTypeLabel: Record<CourseType, string> = {
  [CourseType.ELEARNING1]: '이러닝1',
  [CourseType.ELEARNING2]: '이러닝2',
  [CourseType.CLASS]: '집합교육',
  [CourseType.LIVE]: '라이브강의',
  [CourseType.EXAM]: '시험',
  [CourseType.SURVEY]: '설문',
};

// 접수 상태 유형
export enum CourseEnrollStatusType {
  NOT_OPEN_YET = 'NOT_OPEN_YET',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  WAITING = 'WAITING',
  ENROLLED = 'ENROLLED',
  CANCELLED = 'CANCELLED',
  WAITING_CANCELLED = 'WAITING_CANCELLED',
  WAITING_ENROLLED = 'WAITING_ENROLLED',
  ENROLL_REQUEST = 'ENROLL_REQUEST',
  ENROLL_CANCEL_REQUEST = 'ENROLL_CANCEL_REQUEST',
  ENROLL_WAITING_REQUEST = 'ENROLL_WAITING_REQUEST',
  ENROLL_WAITING_CANCEL_REQUEST = 'ENROLL_WAITING_CANCEL_REQUEST',
}


// 과정상세 인터페이스
export interface CourseResponse {
  // 과정명
  courseName?: string;
  // 별점 평점
  starRatingAverage?: number;
  // 별점 목록(1-5)
  starRatings?: Array<StarRating>;
  // 좋아요 수
  likeCount?: number;
  // 조회수
  viewCount?: number;
  // 채널 UUI
  channelUuid?: string;
  // 과정 유형"
  courseType?: CourseType;
  // 대표카테고리 ID
  primaryCategoryId?: number;
  // 카테고리 목록
  categories?: Array<CourseCategoryItem>;
  // 난이도
  trainingLevelType?: TrainingLevelType;
  // 언어 설정
  language?: string;
  // 썸네일 이미지 Group UUID
  thumbnailFileGroupUuid?: string;
  // 대표 썸네일 이미지 UUID
  primaryThumbnailFileUuid?: string;
  // 과정요약
  courseSummary?: string;
  // 태그 이름 목록
  tagNames?: Array<TagItem>;
  // 과정내용
  courseContent?: string;
  // 이수기준 설정 여부
  isUsePassOption?: boolean;
  // 이수 처리 방식 (자동/수동)
  passMethodType?: PassMethodType;
  // 수료증 제공 여부
  isCertificateProvided?: boolean;
  // 항목별 이수 기준 (진도)
  progressMinPassScore?: number;
  // 항목별 이수 기준 (출석)
  attendanceMinPassScore?: number;
  // 항목별 이수 기준 (평가)
  examMinPassScore?: number;
  // 항목별 이수 기준 (과제)
  asgmtMinPassScore?: number;
  // 항목별 이수 기준 (총점)
  totalMinPassScore?: number;
  // 반영 비율 (진도)
  progressWeights?: number;
  // 반영 비율 (출석)
  attendanceWeights?: number;
  // 반영 비율 (시험)
  examWeights?: number;
  // 반영 비율 (과제)
  asgmtWeights?: number;
  // 강사 이름
  instructorName?: string;
  // 강사 이메일
  instructorEmail?: string;
  // 강사 경력
  career?: string;
  // 운영자 이름
  operatorName?: string;
  // 운영자 회사
  operatorCompany?: string;
  // 운영자 부서
  operatorDept?: string;
  // 운영자 이메일
  operatorEmail?: string;
  // 운영자 전화번호
  operatorTelNo?: string;
  // 연관 학습 목록
  relatedCourseList?: Array<RelationCourseItem>;
}

// 과정 상세 종합 데이터
export interface CourseCompleteDetail {
  course?: any;
}

// 카테고리 목록
export interface CourseCategoryItem {
  categoryId?: number;
  categoryName?: string;
  categoryCode?: string;
  categoryContent?: string;
  categoryPath?: string;
  isPrimary?: boolean;
  tenantIds?: Array<{ items: number }>;
}

// 연관 학습 목록 아이템
export interface RelationCourseItem {
  // 과정 ID
  courseId?: number;
  // 과정
  courseName?: string;
  // 과정 유형
  courseType?: CourseType;
  // New(개시일로부터 3개월)
  isNew?: boolean;
  // 접수 상태 유형
  courseEnrollStatusType?: CourseEnrollStatusType;
  // 찜
  isBookmarks?: boolean;
  // 영상 시간(이러닝1,2 한정)
  playTime?: number;
  // 태그 이름 목록
  tagNames?: Array<TagItem>;
  // 별점
  starRating?: number;
  // 조회수
  viewCount?: number;
  // 좋아요 수
  likeCount?: number;
  // 디데이
  dday?: number;
}

// 태그 아이템
export interface TagItem {
  // 태그 ID
  tagId?: number;
  // 태그
  tagName?: string;
}

// 별점 인터페이스
export interface StarRating {
  // 별점 (1-5)
  starRating?: number;
  // 별점 수
  starRatingCount?: number;
  // 별점 당 비율
  starRatingRatio?: number;
}

/**
 * pass-option-form-field.tsx 에서만 사용
 */
export interface PassCriteriaData {
  progressMinPassScore?: number; // 항목별 이수 기준 (진도)
  attendanceMinPassScore?: number; // 항목별 이수 기준 (출석)
  examMinPassScore?: number; // 항목별 이수 기준 (평가)
  asgmtMinPassScore?: number; // 항목별 이수 기준 (과제)
  totalMinPassScore?: number; // 항목별 이수 기준 (총점)
  progressWeights?: number; // 반영 비율 (진도)
  attendanceWeights?: number; // 반영 비율 (출석)
  examWeights?: number; // 반영 비율 (시험)
  asgmtWeights?: number; // 반영 비율 (과제)
}
