import { create } from 'zustand';

// 수강관리 생성 정보 타입
export interface EnrollmentCreateInfo {
  courseId: number | null;
  courseName: string | null;
  courseType: string | null;
  sequenceId: number | null;
}

// 수강관리 상태 타입
export interface EnrollmentState {
  enrollmentCreateInfo: EnrollmentCreateInfo; // 코스 생성 정보
}

// 수강관리 액션 타입
export interface EnrollmentActions {
  setEnrollmentCreateInfo: (info: Partial<EnrollmentCreateInfo>) => void; // 코스 생성 정보 변경
  reset: () => void; // 상태 초기화
}

// 수강관리 스토어 타입 (상태 + 액션)
export type EnrollmentStore = EnrollmentState & EnrollmentActions;

// 초기 상태 상수
const INITIAL_ENROLLMENT_STATE: EnrollmentState = {
  enrollmentCreateInfo: {
    courseId: null,
    courseName: null,
    courseType: null,
    sequenceId: null,
  },
};

// zustand 스토어 생성
export const useEnrollmentStore = create<EnrollmentStore>((set) => ({
  ...INITIAL_ENROLLMENT_STATE,
  setEnrollmentCreateInfo: (info) =>
    set((state) => ({
      enrollmentCreateInfo: { ...state.enrollmentCreateInfo, ...info }, // 코스 생성 정보 병합
    })),
  reset: () => set(INITIAL_ENROLLMENT_STATE), // 상태 초기화
}));

// 셀렉터 훅 (각 상태별로 반환)
export const useEnrollmentCreateInfo = () =>
  useEnrollmentStore((state) => state.enrollmentCreateInfo);

// 액션 훅 (액션만 반환)
export const useEnrollmentActions = () => {
  const setEnrollmentCreateInfo = useEnrollmentStore((state) => state.setEnrollmentCreateInfo);
  const reset = useEnrollmentStore((state) => state.reset);
  return { setEnrollmentCreateInfo, reset };
};
