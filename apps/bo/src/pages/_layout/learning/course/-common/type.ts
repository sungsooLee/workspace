import { Course, CourseConfig } from '@types';

/**
 * 과정 탭 컴포넌트의 기본 Props 인터페이스
 */
export interface CourseTabBaseProps {
  /** 저장 완료 시 호출되는 콜백 함수 */
  onSave?: () => Promise<void>;
  /** 유형과 채널 변경 시 호출되는 콜백 함수 */
  onConfigPropChange?: (config: { courseType: string; channelUuid: string }) => void;
  /** 폼 데이터와 과정 설정 정보 */
  data: { formData: Course; courseConfig: CourseConfig };
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
