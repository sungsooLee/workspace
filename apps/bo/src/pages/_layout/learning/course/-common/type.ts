import { Course, CourseConfig, CourseListItem, CoursesQueryParams } from '@types';

// ===== 과정 관리 페이지 타입 =====
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

export interface CourseButtonState {
  copy: boolean;
  share: boolean;
}

export interface CourseGridColumn {
  name: string;
  label: () => string;
  size: number;
  render?: (info: any) => React.ReactNode;
}

export interface CourseManagementHookResult {
  provider: any;
  getValues: () => any;
  onSubmit: any;
  gConfig: any;
  selectedRows: CourseListItem[];
  buttonState: CourseButtonState;
  handleOnSearch: (data: CourseSearchFormData) => void;
  handleGridRowsSelect: (rows: CourseListItem[]) => void;
  handleBatchUploadClick: () => void;
  handleCourseOpenClick: () => Promise<void>;
}

export type CourseType = string;

// ===== 과정 상세 탭 타입 =====

/**
 * 과정 탭 컴포넌트의 기본 Props 인터페이스
 */
export interface CourseTabBaseProps {
  /** 저장 완료 시 호출되는 콜백 함수 */
  onSave?: () => Promise<void>;
  /** 유형과 채널 변경 시 호출되는 콜백 함수 */
  onConfigPropChange?: (config: { courseType: string; channelUuid: string }) => void;
  /** 폼 데이터와 과정 설정 정보 */
  data: CourseTabData;
}

/**
 * 탭 폼 참조 인터페이스
 * HTMLDivElement를 확장하여 폼 유효성 검사 기능을 추가
 */
export interface TabFormRef extends Partial<HTMLDivElement> {
  /** 폼 유효성 검사를 수행하는 메서드 */
  validate: () => Promise<{ isValid: boolean; data?: any; errors?: any }>;
  getValues?: () => any;
}

export enum CourseTab {
  STEP1 = 'STEP1',
  STEP2 = 'STEP2',
  STEP3 = 'STEP3',
  STEP4 = 'STEP4',
  STEP5 = 'STEP5',
}

/**
 * 탭 컴포넌트에 전달되는 데이터 타입
 */
export interface CourseTabData {
  /** 폼 데이터 (과정 정보) */
  formData: Course;
  /** 과정 설정 정보 */
  courseConfig: CourseConfig;
  /** 임시 저장 여부 */
  isSaved: boolean;
}

// 과성 상세 조회 탭 타입
export enum CourseDetailTab {
  COURSE_DETAIL = 'COURSE_DETAIL',
  CURRICULUM = 'CURRICULUM',
  SEQUENCE = 'SEQUENCE',
  COMMUNITY = 'COMMUNITY',
}
