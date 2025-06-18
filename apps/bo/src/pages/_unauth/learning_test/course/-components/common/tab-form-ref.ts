// 탭 폼 컴포넌트들의 공통 ref 인터페이스
export interface TabFormRef extends Partial<HTMLDivElement> {
  validate: () => Promise<{ isValid: boolean; data?: any; errors?: any }>;
}
