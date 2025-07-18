/**
 * 상세 탭 폼 참조 인터페이스
 * - validate: 폼 유효성 검사 메서드
 * - getValues: 폼 값 반환 메서드 (선택)
 * HTMLDivElement를 확장하여 폼 유효성 검사 기능을 추가
 */
export interface SequenceTabFormRef extends Partial<HTMLDivElement> {
  getValues?: () => any;
  save?: () => Promise<boolean>;
  delete?: () => Promise<boolean>;
}

/**
 * Page모드
 */
export enum Mode {
  MAIN = 'MAIN',
  DETAIL = 'DETAIL',
}

/**
 * Tab의 key
 */
export enum SequenceTab {
  ENROLLMENT_APPLICATION = 'ENROLLMENT_APPLICATION',
  STUDENT_MANAGEMENT = 'STUDENT_MANAGEMENT',
  EVALUATION_MANAGEMENT = 'EVALUATION_MANAGEMENT',
}

export enum SequenceTabDetail {
  ENROLLMENT_REGIST = 'ENROLLMENT_REGIST',
  ENROLLMENT_WAIT = 'ENROLLMENT_WAIT',
  ENROLLMENT_CANCEL = 'ENROLLMENT_CANCEL',
}
