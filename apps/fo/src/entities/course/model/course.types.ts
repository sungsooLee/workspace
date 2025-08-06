import { ISODateString } from '@shared/types/common';

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
export const CourseEnrollStatusTypeLabel: Record<CourseEnrollStatusType, string> = {
  [CourseEnrollStatusType.NOT_OPEN_YET]: '신청전',
  [CourseEnrollStatusType.OPEN]: '신청가능',
  [CourseEnrollStatusType.CLOSED]: '마감',
  [CourseEnrollStatusType.WAITING]: '대기중',
  [CourseEnrollStatusType.ENROLLED]: '수강중',
  [CourseEnrollStatusType.CANCELLED]: '수강취소',
  [CourseEnrollStatusType.WAITING_CANCELLED]: '대기취소',
  [CourseEnrollStatusType.WAITING_ENROLLED]: '대기신청완료',
  [CourseEnrollStatusType.ENROLL_REQUEST]: '수강신청요청',
  [CourseEnrollStatusType.ENROLL_CANCEL_REQUEST]: '수강취소요청',
  [CourseEnrollStatusType.ENROLL_WAITING_REQUEST]: '대기신청요청',
  [CourseEnrollStatusType.ENROLL_WAITING_CANCEL_REQUEST]: '대기취소요청',
};

// 수강신청/학습 기간 상태
export enum SequenceEnrollStatusType {
  OPEN_BEFORE = 'OPEN_BEFORE',
  EXPIRED = 'EXPIRED',
  FULL = 'FULL',
  APPLYING = 'APPLYING',
  APPROVING = 'APPROVING',
  APPROVED = 'APPROVED',
  LEARNING = 'LEARNING',
  COMPLETED = 'COMPLETED',
}
export const SequenceEnrollStatusTypeLabel: Record<SequenceEnrollStatusType, string> = {
  [SequenceEnrollStatusType.OPEN_BEFORE]: '신청전',
  [SequenceEnrollStatusType.EXPIRED]: '종료',
  [SequenceEnrollStatusType.FULL]: '마감',
  [SequenceEnrollStatusType.APPLYING]: '신청중',
  [SequenceEnrollStatusType.APPROVING]: '승인대기',
  [SequenceEnrollStatusType.APPROVED]: '승인완료',
  [SequenceEnrollStatusType.LEARNING]: '학습중',
  [SequenceEnrollStatusType.COMPLETED]: '완료',
};

// 수강신청 버튼
export enum SequenceEnrollButtonType {
  EXPIRED = 'EXPIRED',
  NOT_ELIGIBLE = 'NOT_ELIGIBLE',
  ENROLL = 'ENROLL',
  CANCEL_ENROLLMENT = 'CANCEL_ENROLLMENT',
  FULL = 'FULL',
  WAITLIST_ENROLL = 'WAITLIST_ENROLL',
  CANCEL_WAITLIST = 'CANCEL_WAITLIST',
  READY_TO_LEARN = 'READY_TO_LEARN',
  START_LEARNING = 'START_LEARNING',
  COMPLETED = 'COMPLETED',
  PASSED = 'PASSED',
  FAILED = 'FAILED',
}
export const SequenceEnrollButtonTypeLabel: Record<SequenceEnrollButtonType, string> = {
  [SequenceEnrollButtonType.EXPIRED]: '종료',
  [SequenceEnrollButtonType.NOT_ELIGIBLE]: '신청불가',
  [SequenceEnrollButtonType.ENROLL]: '수강신청',
  [SequenceEnrollButtonType.CANCEL_ENROLLMENT]: '수강취소',
  [SequenceEnrollButtonType.FULL]: '마감',
  [SequenceEnrollButtonType.WAITLIST_ENROLL]: '대기신청',
  [SequenceEnrollButtonType.CANCEL_WAITLIST]: '대기취소',
  [SequenceEnrollButtonType.READY_TO_LEARN]: '학습준비',
  [SequenceEnrollButtonType.START_LEARNING]: '학습시작',
  [SequenceEnrollButtonType.COMPLETED]: '완료',
  [SequenceEnrollButtonType.PASSED]: '합격',
  [SequenceEnrollButtonType.FAILED]: '불합격',
};

// 학습기간 지정 유형
export enum LearningStartType {
  FIXED_DATE = 'FIXED_DATE',
  DAYS_AFTER_ENROLL = 'DAYS_AFTER_ENROLL',
}
export const LearningStartTypeLabel: Record<LearningStartType, string> = {
  [LearningStartType.FIXED_DATE]: '고정일',
  [LearningStartType.DAYS_AFTER_ENROLL]: '신청완료 후 N일 후',
};

// 교육장소 타입
export enum LearningSpaceType {
  LEARNING_WAY = 'LEARNING_WAY',
  REGISTERED = 'REGISTERED',
  MANUAL = 'MANUAL',
}
export const LearningSpaceTypeLabel: Record<LearningSpaceType, string> = {
  [LearningSpaceType.LEARNING_WAY]: '러닝웨이 교육장소',
  [LearningSpaceType.REGISTERED]: '등록된 교육장소',
  [LearningSpaceType.MANUAL]: '직접입력',
};

// 인정학습시간타입
export enum RecognizedStudyMinType {
  TIME = 'TIME',
  COUNT_TIME = 'COUNT_TIME',
}
export const RecognizedStudyMinTypeLabel: Record<RecognizedStudyMinType, string> = {
  [RecognizedStudyMinType.TIME]: '시간',
  [RecognizedStudyMinType.COUNT_TIME]: '횟수',
};

// 강사타입(사내/사외)
export enum InstructorType {
  INTERNAL_INSTRUCTOR = 'INTERNAL_INSTRUCTOR',
  EXTERNAL_INSTRUCTOR = 'EXTERNAL_INSTRUCTOR',
}
export const InstructorTypeLabel: Record<InstructorType, string> = {
  [InstructorType.INTERNAL_INSTRUCTOR]: '사내강사',
  [InstructorType.EXTERNAL_INSTRUCTOR]: '사외강사',
};

// 날짜형태
type DateTime = string; // '2023-10-01'

// 과정상세 인터페이스
// com.ever.edu.lms.course.dto.res.CourseUserResDto
export interface CourseResponse {
  courseName?: string; // 과정명
  starRatingAverage?: number; // 별점 평점
  starRatings?: Array<StarRating>; // 별점 목록(1-5)
  likeCount?: number; // 좋아요 수
  viewCount?: number; // 조회수
  channelUuid?: string; // 채널 UUI
  courseType?: CourseType; // 과정 유형
  primaryCategoryId?: number; // 대표카테고리 ID
  categories?: Array<CourseCategoryItem>; // 카테고리 목록
  trainingLevelType?: TrainingLevelType; // 난이도
  language?: string; // 언어 설정
  thumbnailFileGroupUuid?: string; // 썸네일 이미지 Group UUID
  primaryThumbnailFileUuid?: string; // 대표 썸네일 이미지 UUID
  courseSummary?: string; // 과정요약
  tagNames?: Array<TagItem>; // 태그 이름 목록
  courseContent?: string; // 과정내용
  isUsePassOption?: boolean; // 이수기준 설정 여부
  passMethodType?: PassMethodType; // 이수 처리 방식 (자동/수동)
  isCertificateProvided?: boolean; // 수료증 제공 여부
  progressMinPassScore?: number; // 항목별 이수 기준 (진도)
  attendanceMinPassScore?: number; // 항목별 이수 기준 (출석)
  examMinPassScore?: number; // 항목별 이수 기준 (평가)
  asgmtMinPassScore?: number; // 항목별 이수 기준 (과제)
  totalMinPassScore?: number; // 항목별 이수 기준 (총점)
  progressWeights?: number; // 반영 비율 (진도)
  attendanceWeights?: number; // 반영 비율 (출석)
  examWeights?: number; // 반영 비율 (시험)
  asgmtWeights?: number; // 반영 비율 (과제)
  instructorName?: string; // 강사 이름
  instructorEmail?: string; // 강사 이메일
  career?: string; // 강사 경력
  operatorName?: string; // 운영자 이름
  operatorCompany?: string; // 운영자 회사
  operatorDeptName?: string; // 운영자 부서
  operatorEmail?: string; // 운영자 이메일
  operatorTelNo?: string; // 운영자 전화번호
  relatedCourseList?: Array<RelationCourseItem>; // 연관 학습 목록
  preqCourseList?: Array<RequiredCourseItem>; // 사전 수강 과정 목록
  isLikeCourse?: boolean; // 찜 여부
  coordinatorName?: string; // 과정 담당자 이름, 회사, 부서, 이메일, 전화번호
  coordinatorCompany?: string; // 과정 담당자 이름, 회사, 부서, 이메일, 전화번호
  coordinatorDeptName?: string; // 과정 담당자 이름, 회사, 부서, 이메일, 전화번호
  coordinatorEmail?: string; // 과정 담당자 이름, 회사, 부서, 이메일, 전화번호
  coordinatorTelNo?: string; // 과정 담당자 이름, 회사, 부서, 이메일, 전화번호
}

// 과정 상세 종합 데이터
export interface CourseCompleteDetail {
  course?: any;
  channel?: any;
  thumbnail?: any;
  class?: any;
  package?: any;
  preRequired?: any;
  introduction?: any;
  educations?: any;
  reviews?: any;
}

// 카테고리 목록
// com.ever.edu.lms.category.dto.res.CourseCategoryFlatDto
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
// com.ever.edu.lms.course.dto.res.CourseUserResDto$SimpleCourseDto
export interface RelationCourseItem {
  courseId?: number; // 과정 ID
  courseName?: string; // 과정
  courseType?: CourseType; // 과정 유형
  isNew?: boolean; // New(개시일로부터 3개월)
  courseEnrollStatusType?: CourseEnrollStatusType; // 접수 상태 유형
  isBookmarks?: boolean; // 찜
  playTime?: number; // 영상 시간(이러닝1,2 한정)
  tagNames?: Array<TagItem>; // 태그 이름 목록
  starRating?: number; // 별점
  viewCount?: number; // 조회수
  likeCount?: number; // 좋아요 수
  dday?: number; // 디데이
}

// 사전수강 학습 목록 아이템
//
export interface RequiredCourseItem {
  courseId?: number;
  courseName?: string;
  courseType?: CourseType;
  curriculumId?: number;
  starRatingAverage?: number;
  viewCount?: number;
  likeCount?: number;
}

// 태그 아이템
// com.ever.edu.lms.tag.dto.res.TagResDto
export interface TagItem {
  tagId?: number; // 태그 ID
  tagName?: string; // 태그
}

// 별점 인터페이스
//com.ever.edu.lms.course.dto.res.StarRatingResDto
export interface StarRating {
  starRating?: number; // 별점 (1-5)
  starRatingCount?: number; // 별점 수
  starRatingRatio?: number; // 별점 당 비율
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

// 과정에 속한 차수 리스트 타입
// com.ever.edu.lms.sequence.dto.res.SequenceUserResDto
export interface CourseSequencesResponse {
  sequenceEnrollStatusType?: SequenceEnrollStatusType; // 수강신청/학습 기간 상태
  sequenceEnrollButtonType?: SequenceEnrollButtonType; // 수강신청 버튼
  courseSequenceId?: number; // 차수 ID
  courseSequenceName?: string; // 차수명
  courseSequenceNo?: number; // 과정 차수(순서)
  enrollStartDateTime?: DateTime; // 수강신청시작일시
  enrollEndDateTime?: DateTime; // 수강신청종료일시
  learningStartType?: LearningStartType; // 학습기간 지정 유형
  learningStartDays?: number; // 교육시작 N일(신청완료 후 N일 후 교육시작)
  learningStartDateTime?: DateTime; // 학습시작일시
  learningEndDateTime?: DateTime; // 학습종료일시
  maxEnrollQuota?: number; // 수강신청 정원
  enrollCount?: number; // 수강 신청 인원
  learningSpaceType?: LearningSpaceType; // 교육장소 타입
  learningSpaceEntity?: any; // LearningSpaceEntity // #/components/schemas/com.ever.edu.lms.space.entity.LearningSpaceEntity
  learningSpaceNameKeyIn?: string; // 교육 장소(직접입력)
  recognizedStudyMinType?: RecognizedStudyMinType; // 인정학습시간타입
  instructorName?: string; // 이름
  instructorType?: InstructorType; // 강사타입(사내/사외)
  isUseTrainingCostPerPerson?: boolean; // 1인당 교육비 사용
  trainingCostPerPerson?: number; // 1인당 교육비(원)
  progressWeights?: number; // 반영 비율-진도
  progressMinPassScore?: number; // 이수 기준 점수-진도
  attendanceWeights?: number; // 반영 비율-출석
  attendanceMinPassScore?: number; // 이수 기준 점수-출석
  examWeights?: number; // 점수 반영 비율-평가
  examMinPassScore?: number; // 이수 기준 점수-평가
  asgmtWeights?: number; // 점수 반영 비율-과제
  asgmtMinPassScore?: number; // 이수 기준 점수-과제
}

// 차수 단건 타입
// com.ever.edu.lms.sequence.dto.res.SequenceResDto$onUser
export interface CourseSequenceOneResponse {
  courseSequenceUuid?: string;
  enrollmentStartDate?: DateTime;
  enrollmentEndDate?: DateTime;
  courseSequenceStartDate?: DateTime;
  courseSequenceEndDate?: DateTime;
  isDeleted?: boolean;
  maxQuota?: number;
  filledQuota?: number;
  course?: CourseResponse; // CourseUserResDto
  coordinatorUuid?: string;
}

// 교육장소Id(공간선택)
// com.ever.edu.lms.space.entity.LearningSpaceEntity
export interface LearningSpaceEntity {
  createdDate?: DateTime; // 생성일시
  modifiedDate?: DateTime; // 수정일시
  createdBy?: string; // 생성자
  lastModifiedBy?: string; // 수정자
  learningSpaceId?: number; // 교육장소 ID
  learningSpaceName?: string; // 교육장소명
  onOffLineType?: 'ONLINE' | 'OFFLINE'; // 온라인/오프라인 타입
  learningSpaceCode?: string; // 교육장소 코드
  mapFileGroupUuid?: string; // 약도 이미지 그룹 UUID
  postalCode?: string; // 우편번호
  address?: string; // 주소
  addressDetail?: string; // 상세주소
  linkUrl?: string; // 링크 URL
  notes?: string; // 비고
  isUsed?: boolean; // 사용 여부
  isDeleted?: boolean; // 삭제 여부
  tenantId?: number; // 테넌트 ID
  tenant?: TenantEntity; // TenantEntity
}

export interface TenantEntity {
  createdDate?: DateTime; // 생성일시
  modifiedDate?: DateTime; // 수정일시
  createdBy?: string; // 생성자
  lastModifiedBy?: string; // 수정자
  tenantId?: number; // 테넌트 ID
  tenantName?: string; // 테넌트 이름
  isUsed?: boolean; // 사용 여부
  isDeleted?: boolean; // 삭제 여부
}

export interface CourseSequenceResponse {
  sequenceEnrollStatusType?: null;
  sequenceEnrollButtonType?: null;
  courseSequenceId: number;
  courseSequenceName: string;
  courseSequenceNo?: null;
  enrollStartDateTime: ISODateString;
  enrollEndDateTime: ISODateString;
  learningStartType?: null;
  learningStartDays?: null;
  learningStartDateTime: ISODateString;
  learningEndDateTime: ISODateString;
  maxEnrollQuota: number;
  enrollCount?: null;
  learningSpaceType?: LearningSpaceType;
  learningSpaceEntity?: null;
  learningSpaceNameKeyIn?: null;
  recognizedStudyMinType: 'TIME';
  recognizedStudyCycles?: null;
  recognizedStudyMinutes?: null;
  isRecognizedStudyPoint?: null;
  recognizedStudyPoint?: null;
  instructorName?: null;
  instructorType?: null;
  isUseTrainingCostPerPerson?: null;
  trainingCostPerPerson?: null;
  progressMinPassScore: number;
  progressWeights: number;
  isUsePassOption?: null;
  passMethodType?: null;
  isCertificateProvided?: null;
  totalMinPassScore: number;
  attendanceMinPassScore: number;
  attendanceWeights: number;
  examMinPassScore: number;
  examWeights: number;
  asgmtMinPassScore: number;
  asgmtWeights: number;
}
