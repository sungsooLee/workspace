import { GridBoxConfig } from '@learnway/ui';
import { Course, CourseConfig, CourseListItem, CoursesQueryParams } from '@types';

// ===== 과정 관리 페이지 타입 =====

/**
 * 과정 검색 폼 데이터 타입
 * - tenantId: 테넌트 정보 (value, label)
 * - channelUuid: 채널 정보 (value, label)
 * - openingDate: 개설일 (timestamp)
 * - courseType: 과정 유형
 * - useYn: 사용 여부
 * - adminName: 관리자명
 * - courseCode: 과정 코드
 * - courseName: 과정명
 */
export interface CourseSearchFormData {
  tenantId: { value: string; label: string };
  channelUuid: { value: string; label: string };
  openingDate?: number;
  courseType?: string;
  useYn?: string;
  adminName?: string;
  courseCode?: string;
  courseName?: string;
}

/**
 * 과정 관리 버튼 상태
 * - copy: 복사 버튼 활성화 여부
 * - share: 공유 버튼 활성화 여부
 */
export interface CourseButtonState {
  copy: boolean;
  share: boolean;
}

/**
 * 과정 그리드 컬럼 정의
 * - name: 컬럼 이름
 * - label: 컬럼 라벨 반환 함수
 * - size: 컬럼 크기
 * - render: 렌더링 함수 (선택)
 */
export interface CourseGridColumn {
  name: string;
  label: () => string;
  size: number;
  render?: (info: any) => React.ReactNode;
}

/**
 * 과정 관리 훅 반환 타입
 * - provider: 폼 provider
 * - getValues: 폼 값 반환 함수
 * - onSubmit: 제출 함수
 * - gConfig: 그리드 설정
 * - selectedRows: 선택된 행 목록
 * - buttonState: 버튼 상태
 * - handleOnSearch: 검색 핸들러
 * - handleGridRowsSelect: 그리드 행 선택 핸들러
 * - handleBatchUploadClick: 일괄 업로드 클릭 핸들러
 * - handleCourseOpenClick: 과정 개설 클릭 핸들러 (비동기)
 */
export interface CourseManagementHookResult {
  provider: any;
  getValues: () => any;
  onSubmit: any;
  gConfig: GridBoxConfig;
  selectedRows: CourseListItem[];
  buttonState: CourseButtonState;
  handleOnSearch: (data: CourseSearchFormData) => void;
  handleGridRowsSelect: (rows: CourseListItem[]) => void;
  handleBatchUploadClick: () => void;
  handleCourseOpenClick: () => Promise<void>;
  handleCopyClick: () => void;
  handleShareClick: () => void;
}

/**
 * 과정 유형 타입 (문자열)
 */
export type CourseType = string;

// ===== 과정 상세 탭 타입 =====

/**
 * 과정 탭 컴포넌트의 기본 Props 인터페이스
 * - onSave: 저장 완료 시 콜백
 * - onConfigPropChange: 유형/채널 변경 시 콜백
 * - data: 폼 데이터 및 과정 설정 정보
 */
export interface CourseTabBaseProps {
  onSave?: () => Promise<void>;
  onConfigPropChange?: (config: { courseType: string; channelUuid: string }) => void;
  data: CourseTabData;
}

/**
 * 과정 상세 탭 컴포넌트의 기본 Props 인터페이스
 * - courseId: 과정 ID
 */
export interface CourseDetailTabBaseProps {
  courseId: number;
}

/**
 * 탭 폼 참조 인터페이스
 * - validate: 폼 유효성 검사 메서드
 * - getValues: 폼 값 반환 메서드 (선택)
 * HTMLDivElement를 확장하여 폼 유효성 검사 기능을 추가
 */
export interface CourseTabFormRef extends Partial<HTMLDivElement> {
  validate: () => Promise<{ isValid: boolean; data?: any; errors?: any }>;
  getValues?: () => any;
}

/**
 * 상세 탭 폼 참조 인터페이스
 * - validate: 폼 유효성 검사 메서드
 * - getValues: 폼 값 반환 메서드 (선택)
 * HTMLDivElement를 확장하여 폼 유효성 검사 기능을 추가
 */
export interface CourseDetailTabFormRef extends Partial<HTMLDivElement> {
  getValues?: () => any;
  save?: () => Promise<boolean>;
  delete?: () => Promise<boolean>;
}

/**
 * 탭 컴포넌트에 전달되는 데이터 타입
 * - formData: 과정 정보
 * - courseConfig: 과정 설정 정보
 * - isSaved: 임시 저장 여부
 */
export interface CourseTabData {
  formData: Course;
  courseConfig: CourseConfig;
  isSaved: boolean;
}

/**
 * 과정 등록/수정 단계별 탭 enum
 */
export enum CourseTab {
  STEP1 = 'STEP1',
  STEP2 = 'STEP2',
  STEP3 = 'STEP3',
  STEP4 = 'STEP4',
  STEP5 = 'STEP5',
}

/**
 * 과정 상세 조회 탭 enum
 * - COURSE_DETAIL: 기본정보
 * - CURRICULUM: 커리큘럼
 * - SEQUENCE: 순서
 * - COMMUNITY: 커뮤니티
 */
export enum CourseDetailTab {
  COURSE_DETAIL = 'COURSE_DETAIL',
  CURRICULUM = 'CURRICULUM',
  SEQUENCE = 'SEQUENCE',
  COMMUNITY = 'COMMUNITY',
}
