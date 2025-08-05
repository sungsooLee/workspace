import { Course, CourseConfig } from '@entities/course';
import { getCurrentAuthUser } from '@shared/lib';

/**
 * 과정 조회 응답 데이터를 과정 폼 데이터로 변환
 *
 * @param {Course} d - 응답 데이터
 * @param {CourseConfig} c - 과정 항목 설정 정보
 * @returns {Course} 폼 데이터
 */
export const responseDataToFormData = (d: Course, c: CourseConfig = {} as CourseConfig): Course => {
  return {
    ...d,
    tenantIds: d?.tenantList?.map((d: any) => d.tenantId), // 테넌트 아이디
    isEnrollRequired: c.enrollOption !== 'IMPOSSIBLE', // 수강신청 설정 기본값 설정
    isLearnEnvEnabled: c.learningEnvOption !== 'IMPOSSIBLE', // 학습환경 설정 기본값 설정
    isLearnControlEnabled: c.learningControlOption !== 'IMPOSSIBLE', // 학습제어 설정 기본값 설정
    isUsePassOption: c.passOption !== 'IMPOSSIBLE', // 이수기준 설정 기본값 설정
    isCommunicationToolEnabled: c.communicationOption !== 'IMPOSSIBLE', // 커뮤니티 및 공유설정 기본값 설정
    isInstructorAssigned: c.instructorOption !== 'IMPOSSIBLE', // 강사 설정 기본값 설정
    isTextbookProvided: c.textBookOption !== 'IMPOSSIBLE', // 교재 설정 기본값 설정
    isRelatedPrerequisiteCourseExisted: c.relatedCourseOption !== 'IMPOSSIBLE', // 사전/연관학습 설정 기본값 설정
    // isAdminDataOption: c.adminDataOption !== 'IMPOSSIBLE', // 행정항목 설정 기본값 설정
    isUseOutsourcing: true, // 오토에버 위탁 전용 설정 여부 (CourseConfig 에 관리안함)
    // 이수기준 설정
    passOption: {
      progressMinPassScore: d.progressMinPassScore, // 진도 최소 이수 점수
      attendanceMinPassScore: d.attendanceMinPassScore, // 출석 최소 이수 점수
      examMinPassScore: d.examMinPassScore, // 평가 최소 이수 점수
      asgmtMinPassScore: d.asgmtMinPassScore, // 과제 최소 이수 점수
      totalMinPassScore: d.totalMinPassScore, // 총점 최소 이수 점수
      progressWeights: d.progressWeights, // 진도 반영 비율
      attendanceWeights: d.attendanceWeights, // 출석 반영 비율
      examWeights: d.examWeights, // 평가 반영 비율
      asgmtWeights: d.asgmtWeights, // 과제 반영 비율
    },
    courseValidityRange: {
      from: d.courseValidityStartDateTime ? new Date(d.courseValidityStartDateTime) : undefined, // 과정 유효 시작일
      to: d.courseValidityEndDateTime ? new Date(d.courseValidityEndDateTime) : undefined, // 과정 유효 종료일
    },
  };
};

/**
 * 과정 폼 데이터를 과정 저장 요청 데이터로 변환하는 함수
 *
 * @component BasicInfo
 * @param {Course} d - 과정 기본 정보 폼 데이터
 * @returns {Course} 과정 기본 정보 요청 데이터
 */
export const formDataToRequestData = (d: Course) => {
  const { lastVisitedBoTenantId } = getCurrentAuthUser() || {}; // 현재 로그인한 사용자의 테넌트 ID

  // 교육공간 라디오 선택에 따라 값 변경 관련 처리 (교육공간=learningSpaceType)
  // 교육공간 > 차세대 학습 플랫폼
  if (d.learningSpaceType === 'LEARNING_WAY') {
    d.learningSpaceId = undefined; // 교육 장소 ID
    d.learningSpaceName = undefined; // 교육 장소(선택입력)
    d.learningSpaceNameKeyIn = undefined; // 교육 장소 직접입력
  }
  // 교육공간 > 공간선택
  else if (d.learningSpaceType === 'REGISTERED') {
    d.learningSpaceNameKeyIn = undefined; // 교육 장소 직접입력
  }
  // 교육공간 > 직접입력
  else if (d.learningSpaceType === 'MANUAL') {
    d.learningSpaceId = undefined; // 교육 장소 ID
    d.learningSpaceName = undefined; // 교육 장소(선택입력)
  }

  // 카테고리 아이디 배열
  d.categoryIds = (d.categories || [])?.map((d: any) => d.categoryId);
  // 대표 카테고리
  d.primaryCategoryId = d.primaryCategoryId || d.categories?.[0]?.categoryId;

  // 학습대상 - TODO targetList == '' 인 경우가 있음 (원인 파악전까지)
  // 학습대상-ID 배열
  d.targetListIds = (d.targetList || [])?.map((d: any) => d.id);

  // 사전 필수과정
  const preRequisiteCourseIds = (d.preRequisiteCourseList || [])
    ?.map((d) => d.courseId)
    ?.filter((id): id is number => id !== undefined);
  // 연관 과정
  const relatedCourseIds = (d.relatedCourseList || [])
    ?.map((d) => d.courseId)
    ?.filter((id): id is number => id !== undefined);

  // 라디오 옵션 null 처리
  // 복습 제한 > 미사용
  if (d.isReviewRestricted === false) {
    d.maxReviewPeriodMonths = undefined; // 복습 제한 기간(개월)
  }

  // 1일 진도제한 > 미사용
  if (d.isDailyLearningProgressRestricted === false) {
    d.maxDailyLearningProgress = undefined; // 1일 진도제한(분)
  }

  // 인정 학습시간 > 학습시간
  if (d.recognizedStudyMinType === 'TIME') {
    d.recognizedStudyCycles = undefined; // 인정 학습 횟수
  }

  // 학습포인트 > 미사용
  if (d.isRecognizedStudyPoint === false) {
    d.recognizedStudyPoint = undefined; // 인정학습점수(학습포인트)
  }

  // 강사 > 강사선택
  if (d.instructorAssignType === 'REGISTERED') {
    d.instructorName = undefined; // 강사 직접입력
  }

  // 1인당 교육비 > 미사용
  if (d.isUseTrainingCostPerPerson === false) {
    d.trainingCostPerPerson = undefined; // 1인당 교육비(원)
  }

  // 고용보험 환급비용 > 미사용
  if (d.isUseEmploymentInsuranceRefund === false) {
    d.employmentInsuranceRefund = undefined; // 고용보험 환급비(원)
  }

  return {
    ...d,
    ...d.passOption, // 이수기준 설정
    tenantId: d.tenantId || lastVisitedBoTenantId || 0, // 테넌트 아이디 (GNB 에서 선택한 테넌트 아이디)
    preRequisiteCourseIds,
    relatedCourseIds,
    courseValidityStartDateTime: d.courseValidityRange?.from, // 과정 유효 시작일
    courseValidityEndDateTime: d.courseValidityRange?.to, // 과정 유효 종료일
  };
};
